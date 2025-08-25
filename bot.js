bot.on('chat', async (username, message) => {
  if (!currentUser) {
    bot.chat('⚠️ You must log in first! Type `gpt: login` in console.');
    return;
  }

  // --- GPT Command System ---
  if (message.startsWith("gpt:")) {
    const cmd = message.slice(4).trim().toLowerCase();

    if (cmd === "logout") {
      console.log(`👋 ${currentUser} signed out.`);
      bot.chat(`👋 ${currentUser} signed out.`);
      currentUser = null;
      role = null;
      loginPrompt();
      return;
    }

    if (role === "GUEST" && cmd.startsWith("kick")) {
      bot.chat("⛔ Guests cannot run gpt:kick.");
      return;
    }

    // other gpt: commands go here
  }

  // --- AI Chat trigger (just mention "chatgpt") ---
  if (message.toLowerCase().includes("chatgpt")) {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: message }]
    });
    bot.chat(response.choices[0].message.content);
  }
});
