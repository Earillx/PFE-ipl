import {User} from './models/schemas/User';
import {Machine} from './models/schemas/Machine';
import {Problem} from './models/schemas/Problem';
import Utils from './controllers/Utils';
import Server from './Server';
import {Status, Type} from "../shared/ProblemDTO";


export default class PopulateDb {

    static newMachine1 = new Machine({
        name: 'machine1',
        ip_address: '192.168.0.0.1',
        mac_address: '88:88:88:88:88:88',
        comment: 'commentaire machine1',
        is_available: true,
        url_etiquette: '',
        url_qr: '',
        local: '099',
    });

    static newProblem1 = new Problem({
        user: new User({email: 'damienmeur@gmail.com', password: 'azerty'}),
        machine: PopulateDb.newMachine1,
        problem_description: 'Du café a coulé sur un ordinateur, le clavier est hs, la souris est ok, le pc ne s\'allume plus',
        short_description: 'accident',
        problem_photo: 'problemes/problem1.jpg',
        type: Type.Accident,
        status: Status.InProgress,
        date: new Date(),
    });

    static newProblem2 = new Problem({
        user: new User({email: 'damienmeur@gmail.com', password: 'azerty'}),
        machine: PopulateDb.newMachine1,
        problem_description: 'La carte réseau a rendu l\'ame',
        short_description: 'panne',
        problem_photo: 'problemes/problem2.jpg',
        type: Type.HardwareProblem,
        status: Status.Opened,
        date: new Date(),
    });

    private static fillUsers() {
        console.log("-> Ajout des utilisateurs.");
        let newUsers = [
            new User({email: 'laurent.leleux@vinci.be', password: 'azerty'}),
            new User({email: 'olivier.choquet@vinci.be', password: 'azerty'})
        ];
        newUsers.map(u => u.save({}, (err, savedUser) => {
            if (err) {
                console.log("Erreur lors de l'insertion de l'utilisateur '%s'.", savedUser.email);
            }
        }));
    }

    private static fillMachines() {
        console.log("-> Ajout des machines.");
        Utils.generateLabel(PopulateDb.newMachine1, Server.serverAddress, (urls: string[]) => {
            PopulateDb.newMachine1.url_etiquette = urls[1];
            PopulateDb.newMachine1.url_qr = urls[0];
            console.log('ICI : ' + urls[0]);
            PopulateDb.newMachine1.save({}, (err, createdMachineObject) => {
                if (err) {
                    console.log("Erreur lors de l'insertion de la machine '%s'.", createdMachineObject.name);
                }
            });
        });

    }

    private static fillProblems() {
        console.log("-> Ajout des problèmes.");
        PopulateDb.newProblem1.save({}, (err, createdProbemObject) => {
            if (err) {
                console.log("Erreur lors de l'insertion du problème '%s'.", createdProbemObject.short_description);
            }
        });
        PopulateDb.newProblem2.save({}, (err, createdProbemObject) => {
            if (err) {
                console.log('Erreur save problème : ' + createdProbemObject.short_description);
            }
        });
    }

    public static fillDb() {
        console.log("Début de peuplement de la base des données.");
        PopulateDb.fillUsers();
        PopulateDb.fillMachines();
        PopulateDb.fillProblems();
        console.log("Fin de peuplement de la base des données.");
    }

}
