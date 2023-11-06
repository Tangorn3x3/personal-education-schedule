npm run generate --spa &&^
gcloud config set project personaleducationschedule &&^
gcloud builds submit --tag gcr.io/maxkain050589/personal-education-schedule --project personaleducationschedule &&^
gcloud run deploy personal-education-schedule --image gcr.io/maxkain050589/personal-education-schedule --platform managed --region europe-west1 --allow-unauthenticated --project personaleducationschedule --port 80