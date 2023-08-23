require('dotenv').config()

export default {
    auth: { tokenExpiresIn: process.env.TOKEN_EXPIRES || 40000, key: process.env.KEY || "TESTE_TESTE" },
    db: {
        uri: process.env.DB_URI || "",
        name: process.env.DB_NAME || ""
    }
}
