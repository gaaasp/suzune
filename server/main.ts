import { SERVICES } from "services/index";
import { Hono } from "hono";
import { supabase } from "utils/index";

const service = new SERVICES["ecoledirecte"]({
    username: "",
    password: "",
});

await service.login();

const app = new Hono();

console.log("🚀", "Suzune successfully started!");

async function withAccount(c: any, fn: Function) {
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
            return fn(data);
        };
    } else {
        c.status(400)
        return c.text("User is not authenticated");
    }
}

app.get("/", c => withAccount(c, async (data) => {
    return c.json(data);
}));

app.get("/homeworks", c => service.getHomeworks().then(data => c.json(data)));
app.get("/documents", c => service.getDocuments(c.req.query("folder")).then(data => c.json(data)));
app.get("/events", c => {
    const date = new Date();
    const first = new Date(date.getFullYear(), date.getMonth(), 1);
    const last = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return service.getEvents(c.req.query("start") || first.toISOString().split("T")[0], c.req.query("end") || last.toISOString().split("T")[0]).then(data => c.json(data));
});
app.get("/grades", c => service.getGrades().then(data => c.json(data)));
app.get("/binders", c => service.getBinders().then(data => c.json(data)));
app.get("/messages", c => service.getMessages("received").then(data => c.json(data)));
app.get("/remarks", c => service.getRemarks().then(data => c.json(data)));
app.get("/documents/:id", c => service.getDocument(c.req.param("id")).then(data => {
    return new Response(data.content, {
        headers: {
            "Content-Type": data.type,
            "Content-Disposition": `inline; filename="${encodeURIComponent(data.name)}"`,
        },
    });
}));

export default {
    port: 3000,
    fetch: app.fetch,
};
