import fetch from "node-fetch";

const { NETCORE_API, EMAIL_FROM, EMAIL_NAME } = process.env;

export const send = async (
  to: string | Array<string>,
  subject: string,
  text: string,
  html: string = null,
  from: string = EMAIL_FROM,
  fromName: string = EMAIL_NAME
) => {
  try {
    let _to: any;

    if (typeof to === "string") {
      _to = [{ email: to }];
    } else {
      _to = to.map((t) => {
        return { email: t };
      });
    }

    const options = {
      method: "POST",
      headers: { api_key: NETCORE_API, "content-type": "application/json" },
      body: JSON.stringify({
        from: { email: from, name: fromName },
        subject,
        content: [{ type: "html", value: html }],
        personalizations: [{ to: _to }],
      }),
    };

    const r = await fetch("https://api.pepipost.com/v5.1/mail/send", options);
    const d = await r.json();

    return d.status === "success";
  } catch (error) {
    return false;
  }
};
