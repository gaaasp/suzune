import { Hono } from "hono";
import { supabase } from "utils/index";
import { Account } from "account/class";

let accounts = {};

const app = new Hono();

console.log("🚀", "Suzune successfully started!");

async function withAccount(c: any, fn: (account: Account) => any) {
    const accessToken = c.req.cookies["access-token"];
    const refreshToken = c.req.cookies["refresh-token"];
    if (accessToken && refreshToken) {
        const { data, error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
        });

        if (error || !data) {
            c.status(400);
            return c.text("User is not authenticated");
        } else {
            if (!accounts[data.id]) {
                accounts[data.id] = new Account(data.id);
            }
            accounts[data.id].session = data;
            return fn(accounts[data.id]);
        };
    } else {
        c.status(400)
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
        .then(([{ data }]) => new Response(data.content, {
            headers: {
                "Content-Type": data.type,
                "Content-Disposition": `inline; filename="${encodeURIComponent(data.name)}"`,
            }
        }))
    ))
;

export default {
    port: 3000,
    fetch: app.fetch,
};
