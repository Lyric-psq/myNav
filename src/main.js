const stringData = localStorage.getItem("siteData");
// 如果JSON.parse(stringData)存在就返回，不存在就设定初始值
const hashMap = JSON.parse(stringData) || [
  { logo: "B", url: "https://www.baidu.com" },
  { logo: "M", url: "https://developer.mozilla.org/zh-CN" },
];
const $sites = $(".sites");
const $last = $(".last");
const render = () => {
  // 每次渲染都要把之前保存在hash里的数据去掉，不然会多次渲染
  $sites.find("li:not(.last)").remove();
  hashMap.forEach((node, index) => {
    let $sites = $(`<li>
        <a href="${node.url}">
          <div class="siteWrapper">
            <div class="oneSite">${node.logo}</div>
            <span>${simplify(node.url)}</span>
            <div class="delete">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-delete"></use>
                </svg>
            </div>
          </div>
        </a>
      </li>`).insertBefore($last);
    $sites.on("click", ".delete", (e) => {
      e.preventDefault();
      e.stopPropagation();
      hashMap.splice(index, 1);
      render();
    });
  });
};
// 简化url
const simplify = (string) => {
  let x = string
    .replace("http://", "")
    .replace("https://", "")
    .replace("www.", "");
  // .replace("/", "");
  return x;
};
render();
$(".addSite").on("click", () => {
  let url = window.prompt("请输入要添加的网址噢");
  if (url.indexOf("http") !== 0) {
    url = "https://" + url;
  }
  hashMap.push({ logo: simplify(url)[0].toUpperCase(), url: url });
  console.log(url);
  render();
});
window.onbeforeunload = () => {
  // localStorage只能保存字符串
  const stringData = JSON.stringify(hashMap);
  localStorage.setItem("siteData", stringData);
};
