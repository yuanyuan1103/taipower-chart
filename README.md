# taipower-chart

此專案將台電open data視覺化的顯示，主要使用Vue以及apexcharts、vue3-apexcharts實作。
<br>關鍵字：Vue 3, options API, Vue CLI, Bootstrap 5, RWD, Axios

## 開發相關連接
- [apexcharts](https://www.npmjs.com/package/apexcharts)
- [vue3-apexcharts](https://www.npmjs.com/package/vue3-apexcharts)
- [gh-pages](https://www.npmjs.com/package/gh-pages)

## 問題與思考
- 如何將台電open data的csv檔案轉為json，以便使用axios串接?
>
- 因x軸顯示日期，故資料過多，要如何處理?
> 原本想只顯示每月第一天，其他日期不顯示，故回傳空值，這樣雖然可以讓x軸簡潔，但也影響到圖表原本應該顯示的日期undefined，
<br>最後利用apexcharts原有的方法修改,利用rotate將x軸顯示的資料旋轉角度變少，讓顯示資料變少，以便x軸顯示簡潔。

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
