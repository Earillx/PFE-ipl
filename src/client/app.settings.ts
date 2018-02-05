export class AppSettings {
    private static findAddress =()=>{
        console.log(process.env);
        if(process.env.NODE_ENV=="development") return "http://127.0.0.1:8888";
        else if(process.env.NODE_ENV=="production") return "http://127.0.0.1:8888"; //TO Modify with prod server
    };
    public static SERVER_ADDRESS=AppSettings.findAddress();
    public static API_ADDRESS= `${AppSettings.SERVER_ADDRESS}/api`;
    public static IMAGE_ADDRESS= `${AppSettings.SERVER_ADDRESS}/images`;

}
