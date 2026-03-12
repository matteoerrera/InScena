# Images

Posiziona qui le immagini/avatar dei personaggi.

## Formato dei file

I file immagine devono corrispondere ai path specificati nel campo `image` di ogni personaggio in `script.json`.

Esempio:
```json
{
  "id": "marco",
  "name": "Marco",
  "image": "/images/marco.jpg"
}
```

## Formati supportati

- JPG/JPEG
- PNG
- WebP
- SVG

## Dimensioni consigliate

- Dimensione minima: 200x200px
- Dimensione consigliata: 400x400px
- Le immagini quadrate funzionano meglio

## Note

Se non specifichi un'immagine, l'app userà automaticamente l'iniziale del nome del personaggio come avatar.
