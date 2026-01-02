const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, MessageFlags } = require('discord.js');
const express = require('express');

// Web server to keep Koyeb happy
const app = express();
app.get('/', (req, res) => res.send('Bot is alive!'));
app.listen(process.env.PORT || 3000);

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMembers]
});

// 200 Unique Colors with Hex Codes
const colors = [
    { name: "Scarlet", hex: "#FF2400" }, { name: "Crimson", hex: "#DC143C" }, { name: "Ruby", hex: "#E0115F" }, { name: "Cherry", hex: "#D2042D" }, { name: "Rose", hex: "#FF007F" },
    { name: "Jam", hex: "#60100B" }, { name: "Merlot", hex: "#730039" }, { name: "Garnet", hex: "#733635" }, { name: "Wine", hex: "#722F37" }, { name: "Blood", hex: "#8A0303" },
    { name: "Mahogany", hex: "#C04000" }, { name: "Brick", hex: "#AA4A44" }, { name: "Rust", hex: "#B7410E" }, { name: "Fire", hex: "#E25822" }, { name: "Candy", hex: "#D21404" },
    { name: "Lipstick", hex: "#AB0552" }, { name: "Berry", hex: "#990F4B" }, { name: "Currant", hex: "#680C07" }, { name: "Blush", hex: "#DE5D83" }, { name: "Coral", hex: "#FF7F50" },
    { name: "Salmon", hex: "#FA8072" }, { name: "Peach", hex: "#FFE5B4" }, { name: "Apricot", hex: "#FBCEB1" }, { name: "Melon", hex: "#FEBAAD" }, { name: "Tangerine", hex: "#F28500" },
    { name: "Marigold", hex: "#EAA221" }, { name: "Amber", hex: "#FFBF00" }, { name: "Gold", hex: "#FFD700" }, { name: "Honey", hex: "#EC9706" }, { name: "Bronze", hex: "#CD7F32" },
    { name: "Copper", hex: "#B87333" }, { name: "Ochre", hex: "#CC7722" }, { name: "Saffron", hex: "#F4C430" }, { name: "Lemon", hex: "#FFF700" }, { name: "Canary", hex: "#FFFF99" },
    { name: "Butter", hex: "#F3E5AB" }, { name: "Cream", hex: "#FFFDD0" }, { name: "Ivory", hex: "#FFFFF0" }, { name: "Vanilla", hex: "#F3E5AB" }, { name: "Flax", hex: "#EEDC82" },
    { name: "Wheat", hex: "#F5DEB3" }, { name: "Sand", hex: "#C2B280" }, { name: "Tan", hex: "#D2B48C" }, { name: "Beige", hex: "#F5F5DC" }, { name: "Khaki", hex: "#C3B091" },
    { name: "Camel", hex: "#C19A6B" }, { name: "Fawn", hex: "#E5AA70" }, { name: "Sepia", hex: "#704214" }, { name: "Taupe", hex: "#483C32" }, { name: "Coffee", hex: "#6F4E37" },
    { name: "Mocha", hex: "#A38068" }, { name: "Chocolate", hex: "#7B3F00" }, { name: "Cocoa", hex: "#D2691E" }, { name: "Caramel", hex: "#C68E17" }, { name: "Toffee", hex: "#D4AF37" },
    { name: "Walnut", hex: "#773F1A" }, { name: "Pecan", hex: "#48260D" }, { name: "Cedar", hex: "#4A3728" }, { name: "Umber", hex: "#635147" }, { name: "Sienna", hex: "#A0522D" },
    { name: "Brunette", hex: "#3B2F2F" }, { name: "Shadow", hex: "#373737" }, { name: "Coal", hex: "#000000" }, { name: "Charcoal", hex: "#36454F" }, { name: "Slate", hex: "#708090" },
    { name: "Steel", hex: "#4682B4" }, { name: "Silver", hex: "#C0C0C0" }, { name: "Platinum", hex: "#E5E4E2" }, { name: "Pearl", hex: "#EAE0C8" }, { name: "Cloud", hex: "#C5CBE1" },
    { name: "Smoke", hex: "#738276" }, { name: "Mist", hex: "#949398" }, { name: "Fog", hex: "#D6D6D6" }, { name: "Pebble", hex: "#333333" }, { name: "Ash", hex: "#B2BEB5" },
    { name: "Flint", hex: "#6E6E6E" }, { name: "Lead", hex: "#212121" }, { name: "Iron", hex: "#434B4D" }, { name: "Graphite", hex: "#253529" }, { name: "Obsidian", hex: "#0B0B0B" },
    { name: "Midnight", hex: "#191970" }, { name: "Navy", hex: "#000080" }, { name: "Indigo", hex: "#4B0082" }, { name: "Sapphire", hex: "#0F52BA" }, { name: "Cobalt", hex: "#0047AB" },
    { name: "Azure", hex: "#007FFF" }, { name: "Cerulean", hex: "#007BA7" }, { name: "Sky", hex: "#87CEEB" }, { name: "Cyan", hex: "#00FFFF" }, { name: "Aqua", hex: "#00FFFF" },
    { name: "Turquoise", hex: "#40E0D0" }, { name: "Teal", hex: "#008080" }, { name: "Ocean", hex: "#0077BE" }, { name: "Marine", hex: "#003366" }, { name: "Denim", hex: "#1560BD" },
    { name: "Electric", hex: "#7DF9FF" }, { name: "Ice", hex: "#99FFFF" }, { name: "Frost", hex: "#E1EDF9" }, { name: "Glacier", hex: "#78B1C1" }, { name: "Arctic", hex: "#D0F0F7" },
    { name: "Emerald", hex: "#50C878" }, { name: "Jade", hex: "#00A86B" }, { name: "Mint", hex: "#3EB489" }, { name: "Sage", hex: "#9C9F84" }, { name: "Olive", hex: "#808000" },
    { name: "Forest", hex: "#228B22" }, { name: "Pine", hex: "#01796F" }, { name: "Moss", hex: "#8A9A5B" }, { name: "Fern", hex: "#71BC78" }, { name: "Basil", hex: "#879F84" },
    { name: "Lime", hex: "#00FF00" }, { name: "Pear", hex: "#D1E231" }, { name: "Chartreuse", hex: "#7FFF00" }, { name: "Seafoam", hex: "#93E9BE" }, { name: "Pistachio", hex: "#93C572" },
    { name: "Avocado", hex: "#568203" }, { name: "Pickle", hex: "#597D35" }, { name: "Seaweed", hex: "#354230" }, { name: "Jungle", hex: "#29AB87" }, { name: "Hunter", hex: "#355E3B" },
    { name: "Violet", hex: "#8F00FF" }, { name: "Lavender", hex: "#E6E6FA" }, { name: "Lilac", hex: "#C8A2C8" }, { name: "Plum", hex: "#8E4585" }, { name: "Grape", hex: "#6F2DA8" },
    { name: "Eggplant", hex: "#614051" }, { name: "Orchid", hex: "#DA70D6" }, { name: "Magenta", hex: "#FF00FF" }, { name: "Fuchsia", hex: "#FF00FF" }, { name: "Iris", hex: "#5A4FCF" },
    { name: "Amethyst", hex: "#9966CC" }, { name: "Mauve", hex: "#E0B0FF" }, { name: "Periwinkle", hex: "#CCCCFF" }, { name: "Thistle", hex: "#D8BFD8" }, { name: "Heather", hex: "#9B7E8D" },
    { name: "Raisin", hex: "#242124" }, { name: "Mulberry", hex: "#C54B8C" }, { name: "Wine", hex: "#722F37" }, { name: "Prune", hex: "#701C1C" }, { name: "Boysenberry", hex: "#873260" },
    { name: "Bubblegum", hex: "#FFC1CC" }, { name: "Cotton Candy", hex: "#FFBCD9" }, { name: "Flamingo", hex: "#FC8EAC" }, { name: "Punch", hex: "#F25278" }, { name: "Watermelon", hex: "#FC6C85" },
    { name: "Strawberry", hex: "#FC5A8D" }, { name: "Raspberry", hex: "#E30B5D" }, { name: "Dragonfruit", hex: "#C92351" }, { name: "Lychee", hex: "#E9D1D1" }, { name: "Guava", hex: "#FFB6C1" },
    { name: "Papaya", hex: "#FFEFD5" }, { name: "Mango", hex: "#FF8243" }, { name: "Pineapple", hex: "#FFE302" }, { name: "Banana", hex: "#FFE135" }, { name: "Pear", hex: "#D1E231" },
    { name: "Apple", hex: "#8DB600" }, { name: "Grapefruit", hex: "#FF6347" }, { name: "Orange", hex: "#FFA500" }, { name: "Clementine", hex: "#E97451" }, { name: "Nectarine", hex: "#FFBE73" },
    { name: "Coconut", hex: "#FFF5EE" }, { name: "Almond", hex: "#EFDECD" }, { name: "Hazelnut", hex: "#CFB53B" }, { name: "Chestnut", hex: "#954535" }, { name: "Acorn", hex: "#D2B48C" },
    { name: "Hickory", hex: "#AE9B82" }, { name: "Maple", hex: "#C04000" }, { name: "Oak", hex: "#806040" }, { name: "Birch", hex: "#F5F5DC" }, { name: "Willow", hex: "#87A96B" },
    { name: "Bamboo", hex: "#DA6304" }, { name: "Reed", hex: "#E4D96F" }, { name: "Grass", hex: "#7CFC00" }, { name: "Leaf", hex: "#32CD32" }, { name: "Sprout", hex: "#00FF7F" },
    { name: "Seed", hex: "#CFB53B" }, { name: "Root", hex: "#483C32" }, { name: "Bark", hex: "#5C4033" }, { name: "Twig", hex: "#773F1A" }, { name: "Branch", hex: "#8B4513" },
    { name: "Stone", hex: "#888583" }, { name: "Rock", hex: "#5A4D41" }, { name: "Clay", hex: "#B66A50" }, { name: "Mud", hex: "#70543E" }, { name: "Dirt", hex: "#9B7653" },
    { name: "Dust", hex: "#E5E4E2" }, { name: "Sand", hex: "#C2B280" }, { name: "Gravel", hex: "#6E6E6E" }, { name: "Silt", hex: "#94812B" }, { name: "Loam", hex: "#766D5A" },
    { name: "Rain", hex: "#4682B4" }, { name: "Storm", hex: "#4F4F4F" }, { name: "Thunder", hex: "#333333" }, { name: "Lightning", hex: "#F0E130" }, { name: "Wind", hex: "#B0C4DE" },
    { name: "Breeze", hex: "#AFEEEE" }, { name: "Gale", hex: "#708090" }, { name: "Mist", hex: "#E0E0E0" }, { name: "Dew", hex: "#F0F8FF" }, { name: "Frost", hex: "#EDF5FF" },
    { name: "Snow", hex: "#FFFAFA" }, { name: "Hail", hex: "#DCDCDC" }, { name: "Sleet", hex: "#C0C0C0" }, { name: "Ice", hex: "#AFEEEE" }, { name: "Sun", hex: "#FDB813" },
    { name: "Moon", hex: "#F4F1C1" }, { name: "Star", hex: "#FFF9E3" }, { name: "Galaxy", hex: "#2D1B4E" }, { name: "Cosmos", hex: "#0B0B0B" }, { name: "Void", hex: "#000000" }
];

const colorNamesList = colors.map(c => c.name);

client.once('ready', async () => {
    console.log(`Logged in as ${client.user.tag}`);
    const commands = [new SlashCommandBuilder().setName('picker').setDescription('Send color picker boxes')];
    await new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN).put(Routes.applicationCommands(client.user.id), { body: commands });
});

function createBox(boxIndex) {
    const start = boxIndex * 10;
    const currentColors = colors.slice(start, start + 10);
    const embed = new EmbedBuilder().setTitle(`🎨 Color Box ${boxIndex + 1}`).setColor('#5865F2');
    const rows = [new ActionRowBuilder(), new ActionRowBuilder()];
    currentColors.forEach((color, i) => {
        const id = start + i + 1;
        embed.addFields({ name: `${id}. ${color.name}`, value: '\u200B', inline: true });
        rows[Math.floor(i / 5)].addComponents(new ButtonBuilder().setCustomId(`select_color_${id}`).setLabel(`${id}`).setStyle(ButtonStyle.Secondary));
    });
    return { embeds: [embed], components: rows };
}

client.on('interactionCreate', async interaction => {
    if (interaction.isChatInputCommand() && interaction.commandName === 'picker') {
        await interaction.deferReply({ flags: MessageFlags.Ephemeral });
        for (let i = 0; i < 20; i++) {
            await interaction.channel.send(createBox(i));
            await new Promise(r => setTimeout(r, 500));
        }
        await interaction.editReply('✅ Sent!');
    } else if (interaction.isButton() && interaction.customId.startsWith('select_color_')) {
        await interaction.deferReply({ flags: MessageFlags.Ephemeral });
        const color = colors[parseInt(interaction.customId.split('_')[2]) - 1];
        try {
            const oldRoles = interaction.member.roles.cache.filter(r => colorNamesList.includes(r.name));
            for (const [id, r] of oldRoles) {
                await interaction.member.roles.remove(r);
                if (r.members.size === 0) await r.delete().catch(() => {});
            }
            let role = interaction.guild.roles.cache.find(r => r.name === color.name);
            if (!role) role = await interaction.guild.roles.create({ name: color.name, color: color.hex, reason: 'Color Picker' });
            await interaction.member.roles.add(role);
            await interaction.editReply(`✅ Updated to **${color.name}**!`);
        } catch (e) {
            await interaction.editReply('❌ Error! Ensure my role is at the **TOP** with **Manage Roles** permission.');
        }
    }
});

client.login(process.env.DISCORD_TOKEN);
