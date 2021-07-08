import { default as fetch } from 'node-fetch';
import {  User, UserDocument } from '../../models/mongoose';
// UserDocument
class UserSeeder {

    // private teams: Array<ITeam>;
    // private TEAMS_URL: string;
    private users: Array<UserDocument>;

    constructor() {


        this.users = [];

    }
    // constructor() {
    //     this.teams = [];
    //     this.TEAMS_URL = 'http://data.nba.net/10s/prod/v2/2019/teams.json';
    // }

    // CREATE EMPTY USER
    userCreate = async (
        email: string,
        password: string,
        role: string,
        firstName: string,
        lastName: string,
      ) => {
        const userDetail = {
          email,
          localProvider: {
            password,
          },
          role,
          profile: {
            firstName,
            lastName,
          },
        };
    
        const user: IUser = new User(userDetail);
    
        try {
          const createdUser = await user.save();
          this.users.push(createdUser);
    
          console.log(`User created with id: ${createdUser._id}`, {});
        } catch (err) {
            console.log(`An error occurred when creating a user ${err}`, err);
        }
      };

    // FILL USER
    createUsers = async (email, password, role, firstname, lastname) => {
        const promises = [];
    
        this.userCreate(
            email,
            password,
            role,
            firstname,
            lastname,
          // 'test@test.com',
          // 'azerty',
          // 'administrator',
          // 'Ari',
          // 'Lybaert',
          // // 'https://www.ocregister.com/wp-content/uploads/2020/01/ocfqup-01.web_.lakers1ccc51599-1.jpg?w=620',
        );
    
        // for (let i = 0; i < 30; i++) {
        //   const gender = Math.round(Math.random());
        //   promises.push(
        //     this.userCreate(
        //       faker.internet.email(),
        //       'nmdgent007!',
        //       'user',
        //       faker.name.firstName(gender),
        //       faker.name.lastName(gender),
        //       faker.internet.avatar(),
        //     ),
        //   );
        // }
    
        return await Promise.all(promises);
      };


    //     Team.findOneAndUpdate({_id: _id}, team, {new: true, upsert: true}, function (err) {
    //         if(err) {
    //             console.log(`Error occured when find and update teams ${err}`);
    //         } else {
    //             console.log('Teams are updated!');
    //         }});
    //     });

    // };

    // getTeams = async () => {
    //     const url = `${this.TEAMS_URL}`;
    //     const response = await fetch(url);
    //     return response.json();
    // }
}

export default UserSeeder;
