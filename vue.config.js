module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/frontend-semana-4-161/'
    : '/',
  "transpileDependencies": [
    "vuetify"
  ]
}