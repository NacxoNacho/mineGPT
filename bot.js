require('dotenv').config()
const mineflayer = require('mineflayer')
const pathfinder = require('mineflayer-pathfinder')
const fs = require('fs')

const MINEGPT_VERSION = 'v1.3'

// --- Minecraft Icon in ASCII ---
const iconASCII = `

            The Fire

       ░░░░████████████░░░░
     ░░░████████████████░░░
    ░░████████████████████░░
   ░██████████████████████░░
   ░████████░░███████████░░
   ░██████░░░░░░████████░░
   ░████░░░░░░░░░░██████░░
   ░████░░░░░░░░░░██████░░
   ░████░░░░░░░░░░██████░░
    ░████░░░░░░░░██████░░
     ░░██████████████░░░░
       ░░░░████████░░░░
`

// --- ASCII Splash ---
const splash = `
${iconASCII}
           TOM'S CREATIONS
          MineGPT™ ${MINEGPT_VERSION}
          Minecraft Java Edition 1.21.1
`

console.log(splash)
console.log('Welcome to MineGPT!')
console.log(`Starting up MineGPT ${MINEGPT_VERSION}...`)

// --- Load Modules ---
const modules = {}
const modulesDir = './modules'
if (!fs.existsSync(modulesDir)) fs.mkdirSync(modulesDir)

fs.readdirSync(modulesDir).forEach(file => {
  if (file.endsWith('.js')) {
    const modName = file.replace('.js', '')
    modules[modName] = require(`${modulesDir}/${file}`)
    console.log(`✅ Loaded module: ${modName}`)
  }
})

// --- Bot Setup ---
const bot = mineflayer.createBot({
  host: process.env.MC_HOST || '192.168.x.xxx'   // Put your IP here
      port: parseInt(process.env.MC_PORT || '51342', 10),  // Leave this alone!
  username: process.env.MC_USERNAME || 'MineGPT'
})

bot.loadPlugin(pathfinder.pathfinder)

// --- Initialize Modules ---
Object.values(modules).forEach(mod => {
  if (typeof mod.init === 'function') mod.init(bot)
})

// --- Bot Spawn Event ---
bot.once('spawn', () => {
  bot.chat(`MineGPT ${MINEGPT_VERSION} is online! 🚀`)
  console.log('Done! Spawned bot!')
})
