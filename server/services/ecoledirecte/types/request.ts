export type RawRequestConfig = {
    method?: "GET" | "GETALL" | "PUT" | "POST" | "DELETE" | "PATCH";
    data?: any;
    token?: string;
};

export type RequestConfig = RawRequestConfig & {
    type?: "raw" | "json" | "arraybuffer";
};
