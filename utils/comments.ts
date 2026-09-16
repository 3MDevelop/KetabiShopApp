import { API } from "@/constants/api";

function isApiSuccess(result: { status?: unknown } | null | undefined) {
  const status = result?.status;
  return status === true || status === "true" || status === 1 || status === "1";
}

async function readApiResult(response: Response) {
  const text = (await response.text()).replace(/^\uFEFF/, "").trim();
  if (!text) {
    return { status: false, msg: "", empty: true };
  }

  try {
    return { ...JSON.parse(text), empty: false };
  } catch {
    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");
    if (start >= 0 && end > start) {
      try {
        return { ...JSON.parse(text.slice(start, end + 1)), empty: false };
      } catch {
        /* fall through */
      }
    }
    return { status: false, msg: "", empty: true };
  }
}

async function postForm(url: string, body: Record<string, string>) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: Object.entries(body)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
      )
      .join("&"),
  });
  const result = await readApiResult(response);
  return {
    ok: !result.empty && isApiSuccess(result),
    msg: String(result?.msg ?? result?.message ?? "").trim(),
  };
}

export async function editUserComment(payload: {
  userID: string | number;
  commentID: string | number;
  comment: string;
  star?: number;
}) {
  return postForm(API.updateComment, {
    userID: String(payload.userID),
    commentID: String(payload.commentID),
    comment: payload.comment,
    star: String(payload.star ?? 0),
  });
}

export async function deleteUserComment(payload: {
  userID: string | number;
  commentID: string | number;
}) {
  return postForm(API.deleteComment, {
    userID: String(payload.userID),
    commentID: String(payload.commentID),
  });
}
