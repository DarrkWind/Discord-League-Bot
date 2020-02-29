const Discord = require('discord.js');
const league_bot = new Discord.Client();
const token = 'NjgwMjU5NjUwMjEzMzgwMTI5.Xlb-Eg.nMBK-rvoH1Jwa1dm3ja7-1e1prQ';
const fs = require("fs");
let usernames = require('./usernames.json');
let secondary_roles = require('./secondary_roles.json');
let available_players = require('./available_players.json');
let user_profile = require('./user_profile.json');
var last_msg_id;
var last_msg_id2;
var user_msg_id;




league_bot.on('ready',() =>{
    console.log('League Bot activated!');
    setInterval(function(){ 
        available_players.Usernames = '';
        fs.writeFile("./available_players.json",JSON.stringify(available_players,null,2),(err) => {
            if (err) console.log(err)
        });
    }, 1000 * 60 * 60 * 24);

});

league_bot.on('messageReactionAdd', (reaction, user) =>{
    if (user.bot)
        return;
    //console.log(reaction.message.id);
    //console.log(last_msg_id);

    if ((reaction.message.id === last_msg_id) && (user.id  === user_msg_id))
    {
        var reaction_emoji = reaction.emoji.name;
        var data = fs.readFileSync("usernames.json",'utf8',(err) => {        
            if (err) throw err
        });
        var str_role_file = JSON.parse(data);
        var position_arr = ["Top", "Jungle", "Mid", "ADC", "Support"];
        var isFound = false;
        reaction.message.delete(500)
        .then(msg => {
            position_arr.forEach(element => {
                if (str_role_file[element].Usernames.includes(user.username))
                {
                    isFound = true;
                }
            })
        
            if(isFound)
            {
                msg.channel.send('You have already picked a role');
            }
            else
            {
                const roleconfirmed = new Discord.RichEmbed()
                .setColor(0xFF0000)
                .setDescription('You have picked your role as: ' + reaction_emoji)
                msg.channel.send(roleconfirmed);
                if (usernames[reaction_emoji].Usernames === 'None')
                {
                    usernames[reaction_emoji].Usernames = '';
                }
                usernames[reaction_emoji].Usernames += user.username + '\n';
                fs.writeFile("./usernames.json",JSON.stringify(usernames,null,2),(err) => {
                if (err) console.log(err)
                });
                user_profile[user.username].Main_role = reaction_emoji;
                fs.writeFile("./user_profile.json",JSON.stringify(user_profile,null,2),(err) => {
                    if (err) console.log(err)
                });
                const rolepicker2 = new Discord.RichEmbed()
                .setColor(16522069)
                .setDescription('What is your secondary role?')
                msg.channel.send(rolepicker2).then(msgReaction => {
                    last_msg_id2 = msgReaction.id;
                    msgReaction.react('680879499381833795')
                    .then(() => msgReaction.react('680879507389153378'))
                    .then(() => msgReaction.react('680879520441696257'))
                    .then(() => msgReaction.react('680879524270964808'))
                    .then(() => msgReaction.react('680879535532539920'))
                    .catch(() => console.error('One of the emojis failed to react.'));
                }); 
            }
        });
    }
    if ((reaction.message.id === last_msg_id2) && (user.id  === user_msg_id))
    {
        var reaction_emoji = reaction.emoji.name;
        var data = fs.readFileSync("secondary_roles.json",'utf8',(err) => {        
            if (err) throw err
        });
        var str_role_file = JSON.parse(data);
        var position_arr = ["Top", "Jungle", "Mid", "ADC", "Support"];
        var isFound = false;
        reaction.message.delete(500)
        .then(msg => {
            position_arr.forEach(element => {
                if (str_role_file[element].Usernames.includes(user.username))
                {
                    isFound = true;
                }
            })
        
            if(isFound)
            {
                msg.channel.send('You have already picked a role')
            }
            else
            {
                const roleconfirmed = new Discord.RichEmbed()
                .setColor(0xFF0000)
                .setDescription('You have picked your role as: ' + reaction_emoji)
                msg.channel.send(roleconfirmed);
                if (secondary_roles[reaction_emoji].Usernames === 'None')
                {
                    secondary_roles[reaction_emoji].Usernames = '';
                }
                secondary_roles[reaction_emoji].Usernames += user.username + '\n';
                fs.writeFile("./secondary_roles.json",JSON.stringify(secondary_roles,null,2),(err) => {
                if (err) console.log(err)
                });
                user_profile[user.username].Secondary_role = reaction_emoji;
                fs.writeFile("./user_profile.json",JSON.stringify(user_profile,null,2),(err) => {
                    if (err) console.log(err)
                });
                const end = new Discord.RichEmbed()
                .setColor(16757759)
                .setDescription('Type !profile to view your new profile.')
                msg.channel.send(end);
                
            }
        });
        
    } 
});

league_bot.on('message', msg =>{
    let args = msg.content.split(" ");

    function main_role_picker(){
        const rolepicker = new Discord.RichEmbed()
            .setColor(16522069)
            .setDescription('What role do you main?')
            msg.channel.send(rolepicker).then(msgReaction => {
                last_msg_id = msgReaction.id;
                msgReaction.react('680879499381833795')
                .then(() => msgReaction.react('680879507389153378'))
                .then(() => msgReaction.react('680879520441696257'))
                .then(() => msgReaction.react('680879524270964808'))
                .then(() => msgReaction.react('680879535532539920'))
			    .catch(() => console.error('One of the emojis failed to react.'));
            }); 
        return 
    }
    

    function ign(){
        const league_name = new Discord.RichEmbed()
        .setColor(16522069)
        .setDescription('What\'s your Summoner Name? Enter below.')
        msg.channel.send(league_name);
        return
    }

    function fav_champ(){
        const fav = new Discord.RichEmbed()
        .setColor(16522069)
        .setDescription('What\'s your favorite champion? Enter below.')
        msg.channel.send(fav);
        return 
    }

    switch(args[0]){
        case '!help':
            const help = new Discord.RichEmbed()
            .setTitle('List of Commands')
            .addField('!profile', 'Displays user profile.')
            .addField('!createprofile', 'Creates user profile.')
            .addField('!editprofile', 'Edit your profile(COMING SOON).')
            .addField('!whosplaying', 'Check out who\'s playing today.')
            .addField('!addme','Type this command if you are playing today.')
            .addField('!removeme', 'Type this command if you don\'t want to play.')
            .addField('!mainlist', 'See list of primary roles.')
            .addField('!secondlist','See list of secondary roles.')
            .addField('!coins','COMING SOON')
            .setColor(16522069)
            msg.channel.send(help);
            break;
       
        case '!mainlist':
            var position_arr = ["Top", "Jungle", "Mid", "ADC", "Support"];
            position_arr.forEach(element =>{
                if (!usernames[element])
                {
                    usernames[element] ={
                        Usernames: 'None'
                    };
                    fs.writeFile("./usernames.json",JSON.stringify(usernames,null,2),(err) => {
                        if (err) console.log(err)
                    });
                }
            });

            var top = usernames['Top'].Usernames;
            var jungle = usernames['Jungle'].Usernames;
            var mid = usernames['Mid'].Usernames;
            var adc = usernames['ADC'].Usernames;
            var support = usernames['Support'].Usernames;

            const embed = new Discord.RichEmbed()
            .setTitle('Primary Role List')
            .setColor(16522069)
            .addField('Top',top)
            .addField('Jungle',jungle)
            .addField('Mid',mid)
            .addField('ADC',adc)
            .addField('Support',support)
            msg.channel.send(embed);
            break;
        
        case '!secondlist':
            var position_arr = ["Top", "Jungle", "Mid", "ADC", "Support"];
            position_arr.forEach(element =>{
                if (!secondary_roles[element])
                {
                    secondary_roles[element] ={
                        Usernames: 'None'
                    };
                    fs.writeFile("./secondary_roles.json",JSON.stringify(secondary_roles,null,2),(err) => {
                        if (err) console.log(err)
                    });
                }
            });
    
            var top = secondary_roles['Top'].Usernames;
            var jungle = secondary_roles['Jungle'].Usernames;
            var mid = secondary_roles['Mid'].Usernames;
            var adc = secondary_roles['ADC'].Usernames;
            var support = secondary_roles['Support'].Usernames;
    
            const second_role_embed = new Discord.RichEmbed()
            .setTitle('Secondary Role List')
            .setColor(16522069)
            .addField('Top',top)
            .addField('Jungle',jungle)
            .addField('Mid',mid)
            .addField('ADC',adc)
            .addField('Support',support)
            msg.channel.send(second_role_embed);
            break;

        case '!whosplaying':
            var str_playing = available_players.Usernames;
            if (available_players.Usernames === ''){
                str_playing = 'None';
            }
            const embed2 = new Discord.RichEmbed()
            .setTitle('Available Users')
            .setColor(5844459)
            .setDescription(str_playing)
            .setFooter('Type !addme to be added')
            
            msg.channel.send(embed2);
            break;

        case '!addme':
            var available_players_data = fs.readFileSync("available_players.json",'utf8',(err) => {        
            if (err) throw err
            });
            var str_available_players = JSON.parse(available_players_data);
            if (str_available_players.Usernames.includes(msg.author.username))
            {
                msg.channel.send('You have already been added to the List.');
            }
            else
            {
                const embed3 = new Discord.RichEmbed()
                .setColor(6750105)
                .setDescription('You have been added!')
                msg.channel.send(embed3);
                available_players.Usernames += msg.author.username + '\n';
                fs.writeFile("./available_players.json",JSON.stringify(available_players,null,2),(err) => {
                if (err) console.log(err)
                });
    
            }
            break;
        
        case '!removeme':
            var available_players_data = fs.readFileSync("available_players.json",'utf8',(err) => {        
            if (err) throw err
            });
            var str_available_players = JSON.parse(available_players_data);
            if (str_available_players.Usernames.includes(msg.author.username))
            {
                available_players.Usernames = available_players.Usernames.replace(msg.author.username+'\n','');
                fs.writeFile("./available_players.json",JSON.stringify(available_players,null,2),(err) => {
                    if (err) console.log(err)
                });
                const removed = new Discord.RichEmbed()
                .setColor(16522069)
                .setDescription('You have been removed!')
                msg.channel.send(removed);
            }
            else
            {
                msg.channel.send('You were not found on the List.');
            }
            break;
        
        case '!profile':
            if (!user_profile[msg.author.username])
            {
                msg.channel.send('You haven\'t created a profile yet. Here is the default one');
                const default_profile = new Discord.RichEmbed()
                .setTitle(msg.author.username)
                .setThumbnail(msg.author.displayAvatarURL)
                .setColor(3407871)
                .addField('IGN', 'BLANK RN')
                .addField('Level', 'Level 0')
                .addField('Main Role','role',true)
                .addField('Secondary Role','role',true)
                .addField('Favorite Champion:','Coming Soon')
                .addField('Coins:','Coming Soon')
                .setFooter('Type !createprofile to create one.')
                msg.channel.send(default_profile);
            }
            else
            {
                const profile = new Discord.RichEmbed()
                .setTitle(msg.author.username)
                .setThumbnail(msg.author.displayAvatarURL)
                .setColor(3407871)
                .addField('IGN', user_profile[msg.author.username].IGN)
                .addField('Level', 'Level 0')
                .addField('Main Role', user_profile[msg.author.username].Main_role,true)
                .addField('Secondary Role', user_profile[msg.author.username].Secondary_role,true)
                .addField('Favorite Champion:', user_profile[msg.author.username].Favorite_champion)
                .addField('Coins:','Coming Soon')
                msg.channel.send(profile);
            }
            break;
        
        case '!createprofile':
            var data = fs.readFileSync("user_profile.json",'utf8',(err) => {        
                if (err) throw err
            });
            var str_profile = JSON.parse(data);
            if (!str_profile[msg.author.username])
            {   
                user_profile[msg.author.username] = {
                    IGN: 'None',
                    Main_role: 'None',
                    Secondary_role: 'None',
                    Favorite_champion: 'None'
                };
                user_msg_id = msg.author.id;
                let p = new Promise((resolve,reject) => {
                ign();
                var notcollected = false;
                const collector = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, { max: 1, time: 180000 });
                collector.on('collect', message => {
                    user_profile[msg.author.username].IGN = message.content;
                    fs.writeFile("./user_profile.json",JSON.stringify(user_profile,null,2),(err) => {
                        if (err) console.log(err)
                    });
                    if (user_profile[msg.author.username].IGN === message.content){
                        resolve('sucess');
                    }
                    else{
                        reject('fail');
                    }
                });
               
                collector.on('end', collected =>{
                    if (collected.size === 0){
                       notcollected = true;
                       delete user_profile[msg.author.username];
                       fs.writeFile("./user_profile.json",JSON.stringify(user_profile,null,2),(err) => {
                        if (err) console.log(err)
                        });
                    }
             
                });

                setTimeout(function() {
                if (notcollected === true){
                    msg.channel.send('Your creation has expired. Please type !createprofile to try again');
                }
                }, 180000);
                });
                
                p.then(() => {
                let p2 = new Promise((resolve,reject) => {
                fav_champ();
                var notcollected = false;
                const collector2 = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, { max: 1, time: 180000 });
                collector2.on('collect', message => {
                    user_profile[msg.author.username].Favorite_champion = message.content;
                    fs.writeFile("./user_profile.json",JSON.stringify(user_profile,null,2),(err) => {
                        if (err) console.log(err)
                    });
                    if (user_profile[msg.author.username].Favorite_champion === message.content){
                        resolve('sucess');
                    }
                    else{
                        reject('fail');
                    }
                });
                collector2.on('end', collected =>{
                    if (collected.size === 0){
                        notcollected = true;
                        delete user_profile[msg.author.username];
                        fs.writeFile("./user_profile.json",JSON.stringify(user_profile,null,2),(err) => {
                            if (err) console.log(err)
                        });
                    }
                });
                setTimeout(function() {
                    if (notcollected === true){
                        msg.channel.send('Your creation has expired. Please type !createprofile to try again');  
                    }
                }, 180000);
                });

                    p2.then(() => {
                    main_role_picker()
                    }).catch((err)=>{console.log(err)});

                }).catch((err)=>{console.log(err)});  
                
            }
            else 
            {
                const alreadycreated = new Discord.RichEmbed()
                .setDescription('You have already created your profile. Type !editprofile to edit.')
                .setColor(16522069)
                msg.channel.send(alreadycreated);
            }
            break;
        
        case '!editprofile':
            break;

    }
})

league_bot.login(token);
//var memeber = reaction.message.guild.members.find(memeber => memeber.id.toLowerCase() === user.id.toLowerCase());
