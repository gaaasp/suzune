import { Buffer } from "buffer";
import { createCipheriv, createDecipheriv } from "crypto";
import { randomBytes } from "crypto";

export function encrypt(value: string) {
    const iv = Buffer.from(randomBytes(16));
    const cipher = createCipheriv(
        "aes-256-gcm",
        Buffer.from(Bun.env.ENCRYPT_KEY),
        iv
    );
    const encpass = Buffer.concat([cipher.update(value), cipher.final()]);
    return {
        iv: iv.toString("hex"),
        params: encpass.toString("hex"),
        tag: cipher.getAuthTag().toString("hex")
    };
}

export function decrypt({ iv, params, tag }: { iv: string, params: string, tag: string }) {
    const decipher = createDecipheriv(
        "aes-256-gcm",
        Buffer.from(Bun.env.ENCRYPT_KEY),
        Buffer.from(iv, "hex")
    );
    decipher.setAuthTag(Buffer.from(tag, "hex"));
    const decpass = Buffer.concat([
        decipher.update(Buffer.from(params, "hex")),
        decipher.final(),
    ]);
    return decpass.toString();
}
