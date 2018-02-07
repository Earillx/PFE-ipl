
import {User} from "./models/schemas/User";
import {Machine} from "./models/schemas/Machine";
import {Problem} from "./models/schemas/Problem";
import Utils from "./controllers/Utils";
import Server from "./Server";


export default class PopulateDb{

    static etiquette1 = "TODO";
    static newMachine1 = new Machine({
        name: "machine1",
        ip_address: "192.168.0.0.1",
        mac_address: "88:88:88:88:88:88",
        comment: "commentaire machine1",
        is_available: true,
        url_etiquette: "",
        local: "099",
    });
    static newProblem1 = new Problem({
        user: new User({email:"damienmeur@gmail.com",password:"azerty"}),
        machine: PopulateDb.newMachine1,
        problem_description: "Du café a coulé sur un ordinateur, le clavier est hs, la souris est ok, le pc ne s'allume plus",
        short_description:"accident",
        problem_photo: "images/problemes/problem1.jpg",
        date: new Date(),
    });

    public static fillDb(){
        PopulateDb.fillUsers();
        PopulateDb.fillMachines();
        PopulateDb.fillProblems();

    }

    private static fillUsers() {
        let newUsers = [
            new User({email:"laurent.leleux@vinci.be",password:"azerty"}),
            new User({email:"olivier.choquet@vinci.be",password:"azerty"})
        ];
        newUsers.map(u=>u.save({}, (err, savedUser) => {
            if (err) {
                console.log("Erreur save user : "+savedUser.email);
            }
            else {
                console.log("Utilisateur sauvé : "+savedUser.email+"// id : "+savedUser._id);
            }
        }));

    }

    private static fillMachines() {
        let label_uri = Utils.generateLabel(PopulateDb.newMachine1, Server.serverAddress);
        PopulateDb.newMachine1.url_etiquette= label_uri;
        console.log("ICI : "+label_uri);
        PopulateDb.newMachine1.save({}, (err, createdMachineObject) => {
            if (err) {
                console.log("Erreur save machine : "+ createdMachineObject.name);
            } else {
                console.log("Machine sauvée : "+createdMachineObject.name+"// id : "+createdMachineObject._id);
            }
        });
    }
    private static fillProblems() {
        PopulateDb.newProblem1.save({}, (err, createdProbemObject) => {
            if (err) {
                console.log("Erreur save problème : "+createdProbemObject.short_description);
            } else {
                console.log("Problème sauvé : "+createdProbemObject.short_description+"// id : "+createdProbemObject._id);
            }
        });

    }

}