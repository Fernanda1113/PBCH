import { normalize, schema } from "normalizr";

export const escapeHtml = unsafe =>
  unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const userSchema = new schema.Entity("users", {}, { idAttribute: "email" });
const messageSchema = new schema.Entity("messages", {
  author: userSchema
});
const messageListSchema = [messageSchema];

export const normalizeMessages = messages =>
  normalize(messages, messageListSchema);