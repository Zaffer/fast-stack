import discord
from google.cloud import secretmanager


secret = secretmanager.SecretManagerServiceClient()

name = f"projects/{"gcp-project"}/secrets/{"DISCORD_BOT_TOKEN"}/versions/latest"
response = secret.access_secret_version(request={"name": name})
token = response.payload.data.decode("UTF-8")

intents = discord.Intents.default()
intents.message_content = True

server = discord.Client(intents=intents)

@server.event
async def on_ready():
    print(f'We have logged in as {server.user}')

@server.event
async def on_message(message):
    if message.author == server.user:
        return

    if message.content.startswith('hello'):
        await message.channel.send('Hello!')

server.run(token)