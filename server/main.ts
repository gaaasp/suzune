import { Hono } from "hono";
import { cors } from "hono/cors";
import { supabase } from "utils/index";
import { Account } from "account/class";

let accounts = {};

const app = new Hono();
app.use("*", cors({ origin: ["http://192.168.1.24:5173", "http://localhost:5173"], allowHeaders: ["X-Auth-Token"] }));

console.log("🚀", "Suzune successfully started!");

async function withAccount(c: any, fn: (account: Account) => any) {
    const token = c.req.cookie("supabase-auth-token") || c.req.headers.get("X-Auth-Token");
    const parsedToken = token && JSON.parse(token);
    const accessToken = parsedToken[0];
    const refreshToken = parsedToken[1];
    if (accessToken && refreshToken) {
        const { data, error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
        });

        if (error || !data) {
            c.status(400);
            console.log(error);
            return c.text("User is not authenticated");
        } else {
            const id = data.user.id;
            if (!accounts[id]) {
                accounts[id] = new Account(id);
            }
            accounts[id].session = data;
            const returned = await fn(accounts[id]);
            return returned instanceof Response ? returned : c.json(returned);
        };
    } else {
        c.status(400);
        return c.text("User is not authenticated");
    }
}

app
    .get("/integrations", (c: any) => withAccount(c, account => account.getIntegrations()))
    .post("/integrations", (c: any) => withAccount(c, async account => {
        const body = await c.req.json();
        return account.createIntegration({ service: body.service, params: body.params });
    }))
    .get("/homeworks", (c: any) => withAccount(c, account => account.getHomeworks(c.req.query("integrations"), c.req.query("start"), c.req.query("end"))))
    .get("/grades", (c: any) => withAccount(c, account => account.getGrades(c.req.query("integrations"))))
    .get("/binders", (c: any) => withAccount(c, account => account.getBinders(c.req.query("integrations"))))
    .get("/messages", (c: any) => withAccount(c, account => account.getMessages(c.req.query("integrations"), c.req.query("type") || "received", c.req.query("binder"))))
    .get("/remarks", (c: any) => withAccount(c, account => account.getRemarks(c.req.query("integrations"))))
    .get("/documents", (c: any) => withAccount(c, account => account.getDocuments(c.req.query("integrations"), c.req.query("folder"))))
    .get("/events", (c: any) => withAccount(c, account => {
        const date = new Date();
        const first = new Date(date.getFullYear(), date.getMonth(), 1);
        const last = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        return account.getEvents(c.req.query("integrations"), c.req.query("start") || first.toISOString().split("T")[0], c.req.query("end") || last.toISOString().split("T")[0]);
    }))
    .get("/documents/:id", (c: any) => withAccount(c, account => account.getDocument(c.req.query("integrations"), c.req.param("id"))
        .then(([{ data }]) => {
            c.header("Content-Type", data.type);
            c.header("Content-Disposition", `inline; filename="${encodeURIComponent(data.name)}"`)
            return c.body(data.content);
        })
    ))
    .options("*", (c) => {
        return c.json({ success: true })
      })
;

export default {
    port: 3000,
    fetch: app.fetch,
};
