import { USER_AGENT } from "config";
import { RawRequestConfig, RequestConfig } from "./types/index";

export function rawRequest(path: string, { method = "GET", data, token }: RawRequestConfig = {}): Promise<Response> {
    const [pathName, params] = path.split("?");
    return fetch(`https://api.ecoledirecte.com/v3/${pathName}.awp?verbe=${method.toLowerCase()}${params ? `&${params}` : ""}`, {
                method: "POST",
                body: typeof data == "object" || !data ? `data=${JSON.stringify({
                    ...(typeof data === "object" ? data : {}),
                    ...(token ? { token } : {}),
                })}` : typeof data === "string" ? `${data}&token=${token}` : data,
                headers: {
                    "user-agent": USER_AGENT,
                },
            }
    );
}

export function request<Data>(path: string, { type = "json", ...config }: RequestConfig): Promise<Data> {
    return rawRequest(path, config).then(res => {
            if (!res.ok) {
                throw {
                    code: res.status,
                    message: res.statusText,
                };
            } else return type !== "arraybuffer" ? res.json().then((res: { code: number; message: string; data: any; }) => {
                if (Math.floor(res.code / 100) >= 3) {
                    throw {
                        code: res.code,
                        message: res.message,
                    };
                } else return type === "raw" ? res : res.data;
            }) : res.arrayBuffer();
        });
}
