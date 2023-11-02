npm run generate --spa &&^
gcloud builds submit --tag gcr.io/snippeter-frontend/snippeter-frontend --project snippeter-frontend &&^
gcloud run deploy snippeter-frontend --image gcr.io/snippeter-frontend/snippeter-frontend --platform managed --region europe-west1 --allow-unauthenticated --project snippeter-frontend --port 80