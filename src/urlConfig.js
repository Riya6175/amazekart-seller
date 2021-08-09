

const baseUrl = "https://amazekart-rest-server.herokuapp.com"

export const api = `${baseUrl}/api`;

export const generatePublicUrl = (fileName) => {
    return `${baseUrl}/public/${fileName}`
}