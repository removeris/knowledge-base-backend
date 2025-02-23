const { app, PORT, fs, express} = require('./config')

const routeSetup = require('./routes');
const upload = require('./file_upload');

const savedArticlesDir = "./saved_articles";
if (!fs.existsSync(savedArticlesDir)) {
    fs.mkdirSync(savedArticlesDir);
}

routeSetup(app, upload, fs);

app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

app.listen(PORT,  "0.0.0.0", () => console.log(`Server running on http://localhost:${PORT}`));


