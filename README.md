# Performer Calendar App

## Compiling static resource

Run the two commands below to update the resources
```
npm run build
python manage.py collectstatic --no-input
```

## Rebuild and run
```
npm run build; python manage.py collectstatic --no-input; python manage.py runserver
```