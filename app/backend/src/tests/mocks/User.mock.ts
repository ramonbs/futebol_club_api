export const userMock = {
    id: "1",
    name: "Admin",
    email: "admin@admin.com",
    password: "123456",
};

export const validLogin = {
    email: "admin@admin.com",
    password: "secret_admin"
};

export const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlhdCI6MTY4Njc3MTI3Nn0.L3qaLnlRaoNki771xxrKu1PP2FLsxoa0FC1FmyoCcyc";

export const userRegisteredMock = {
    ...userMock,
    password: "$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW",
};
