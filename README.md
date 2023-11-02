# Pesrsonal education scheduler

ТОЛЬКО С 14й НОДОЙ!

Собирать для прода через

```sh
npm run generate --spa
```

Потом обязательно добавить в гит всю папку /docs (Ctrl-Alt-A), 
т.к. новые файлы могут быть проигнорены гитом



npm run generate --spa && \
gcloud builds submit --tag gcr.io/snippeter-frontend/snippeter-frontend --project snippeter-frontend && \
gcloud run deploy snippeter-frontend --image gcr.io/snippeter-frontend/snippeter-frontend --platform managed --region europe-west1 --allow-unauthenticated --project snippeter-frontend --port 80


gcloud builds submit --tag gcr.io/snippeter-frontend/snippeter-frontend --project snippeter-frontend && gcloud run deploy --image gcr.io/snippeter-frontend/snippeter-frontend --platform managed --region europe-west1 --allow-unauthenticated


gcloud run deploy snippeter-frontend --image gcr.io/snippeter-frontend/snippeter-frontend --platform managed --region europe-west1 --allow-unauthenticated --project snippeter-frontend --port 80

gcloud beta run deploy --image gcr.io/mywebsite-239106/hello