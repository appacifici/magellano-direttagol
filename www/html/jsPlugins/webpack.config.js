const path                      = require( 'path' );
const HtmlWebpackPlugin         = require( 'html-webpack-plugin' ); //per la gestione dinamica dell'inclusioned dei bundle
const {CleanWebpackPlugin}      = require( 'clean-webpack-plugin' ); //per la gestione dinamica dell'inclusioned dei bundle

//Definisce l'export delle configurazioni
module.exports = {
    mode: 'production', //Definisce la modalità di compilazione
    entry: {
        app:     './src/index.ts'
    },     
    devtool:'inline-source-map',
    target: ['web', 'es5'],

    //Per ricaricare il browser in automatico ad ogni salvataggio
    devServer: {
        static: {
            directory: path.join(__dirname, "dist")
        }
    },
    //Se da errore nel ricaricamento automatico della pagina
    optimization: {
        //runtimeChunk: 'single'
    },
    
    //Caricamento dei plugin
    plugins: [
        new HtmlWebpackPlugin({}),
        new CleanWebpackPlugin()        
    ],
    
    //[name] serve a generare i file bundle con il prefisso degli entry
    output: {        
        filename: '[name].bundle.js', //Definizione del file che viene generato
        path: path.resolve( __dirname, 'dist' ) //Definizione della cartella di destinazione
    },
    
    //Definisce le estensioni che deve gestire
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx']
    },
    
    //Caricamentio dei moduli richiesti per i file specifici
    module: {
        rules: [
            {
                test: /\.css$/, //Definiamo il tipo di file da gestire
                use: [
                    'style-loader',
                    'css-loader'
                    //Definiamo il tipi di loader 
                ]
            },
            {
                test: /\.tsx?/, //Per utilizzare typescript
                use: [
                    'ts-loader'
                ]
            }
        ]
    }
}; 