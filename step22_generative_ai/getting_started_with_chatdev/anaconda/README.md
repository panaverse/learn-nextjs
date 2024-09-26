# Getting_Started_with_ChatDev_using_Anaconda
How to use ChatDev for windows users using anaconda

## Install Anaconda
Install Anaconda from official website of [Anaconda](https://www.anaconda.com/download/).


## Make a folder AI in D:/
Make a folder AI in D drive. Then open this folder in VS Code. And open terminal by clocking Ctrl + Shift + Backtick. Or you can open it from VS Code top menu bar Teminal > New Terminal


## Clone the GitHub Repository
Begin by cloning the repository using the command:

```
git clone https://github.com/OpenBMB/ChatDev.git
```

This repository is present at [ChatDev Github]([url](https://github.com/OpenBMB/ChatDev))

## Set Up Python Environment
Ensure you have a version 3.9 or higher Python environment. 
You can create and activate this environment using the following commands, replacing ChatDev_env with your preferred environment name or you can use as it is

```
python -m venv ChatDev_env
```

## Activate the Enviornment
Use the following command to activate the enviornment

```
ChatDev_env\scripts\activate
```

## Change Directory
Move into the ChatDev directory

```
cd ChatDev
```

## Install Dependencies
Install the necessary dependencies by running

```
pip3 install -r requirements.txt
```

If pip3 is not working in your case you can use pip

## Set OpenAI API Key
Export your OpenAI API key as an environment variable from Open AI official website. [OpenAI](https://openai.com/) For this make a fresh account and generate API key using this link [OpenAI API Key](https://platform.openai.com/account/api-keys)
Replace "your_OpenAI_API_key" with your actual API key. Remember that this environment variable is session-specific, so you need to set it again if you open a new terminal session.

```
set OPENAI_API_KEY="your_OpenAI_API_key"
```

It looks like
```
set OPENAI_API_KEY=sk-kkklkinkkkkkkkkkk...........
```

## Build Your Software
Use the following command to initiate the building of your software, replacing [description_of_your_idea] with your idea's description and [project_name] with your desired project name

```
python run.py --task "[description_of_your_idea]" --name "[project_name]"
```
### Example
```
python run.py --task please make a flask app. app should have a web page asking for students information like name age education address city and phone number. then there should be a submit button. after submitting the record should be saved into a sqlite database --name my-first-ai-app
```

## Run Your Software
Once generated, you can find your software in the WareHouse directory under a specific project folder such as project_name_DefaultOrganization_timestamp. Run your software using the following command within that directory. Here timestamp is a number. You can manually go to folder find your project. It look like my-first-ai-app_DefaultOrganization_1234567890 and copy the path and then change directory using prompt or manually handle it

```
cd WareHouse/project_name_DefaultOrganization_timestamp
```

### In our case

```
cd WareHouse/my-first-ai-app_DefaultOrganization_timestamp
```

## Make a folder name templates here

```
mkd templates
```

You can also make it manually by moving in to folder and then Right Click > New > Folder

## Move HTML files to templates
Now check your folder WareHouse/my-first-ai-app_DefaultOrganization_timestamp and move all .html extension files to templates folder manually

## Run the main.py file

```
python main.py
```
## Run your App
Run your App by clicking link which looks like this: Running on http://127.0.0.1:5000

## Find and Solve Errors
If there are any kind of errors. Then solve it and run your file again.
