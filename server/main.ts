import { SERVICES } from "services/index";
import { Hono } from "hono";
import { supabase } from "utils/index";

let services = {};

const app = new Hono();

console.log("🚀", "Suzune successfully started!");

function withAccount(c, fn) {
    const accessToken = c.req.cookies["access-token"];
    const refreshToken = c.req.cookies["refresh-token"];
    if (accessToken && refreshToken) {
        const { data, error } = supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
        });

        if (error) {
            c.status(400);
            return c.text("User is not authenticated");
        } else {
            return fn(data);
        };
    } else {
        c.status(400)
        return c.text("User is not authenticated");
    }
}

app.get("/homeworks", c => withAccount(c, (data) => {
    console.log(data);
}));

export default {
    port: 3000,
    fetch: app.fetch,
};
