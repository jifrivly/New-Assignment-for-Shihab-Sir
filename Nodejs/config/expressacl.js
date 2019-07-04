var acl = require("express-acl");

var aclConfig = [{
    "group": "localadmin",
    "permissions": [
        {
            "resource": "/employee",
            "methods": ["GET"],
            "action": "allow"
        }
    ]
}];

acl.config({
    rules: aclConfig,
    basUrl: "/",
    denyCallback: (req, res) => {
        res.status(403).json({
            status: "Access Denied",
            success: false,
            message: "You are not authorized to use this route"
        });
    }
});

// controlList.allow([
//     {
//         role: ["superadmin"],
//         allows: [
//             {
//                 resources: ["/employee/list", "/employee/add", "/employee/update", "/employee/delete",],
//                 permissions: ["get", "post", "put", "delete"]
//             }
//         ]
//     },
//     {
//         role: ["admin"],
//         allows: [
//             {
//                 resources: ["/employee/list", "/employee/add", "/employee/update"],
//                 permissions: ["get", "post", "put"]
//             }
//         ]
//     },
//     {
//         role: ["localadmin"],
//         allows: [
//             {
//                 resources: ["/employee/list"],
//                 permissions: ["get"]
//             }
//         ]
//     }
// ], err => {
//     if (err) {
//         console.log("Error while assigning permissions");
//     }
//     console.log("Roles are Successfully Assigned")
// });



















app.use("/employee", require("./employees/employee"));
app.get("/employee", acl.authorize, (req, res) => {
    res.json({ message: "Employee route working" });
});