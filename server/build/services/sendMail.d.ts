interface IData {
    to: string;
    subject: string;
    html: string;
}
declare const sendMail: (data: IData) => Promise<void>;
export default sendMail;
//# sourceMappingURL=sendMail.d.ts.map