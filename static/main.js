const codes = {
  "hello-world": `Mitrooon
 bhaiyo aur behno "Hello World"

Achhe din aa gaye`,
  "if-else": `Mitrooon
agar baat sach hai
    bhaiyo aur behno "Modi sabse achhe pradhan mantri hai."
nahi toh
    bhaiyo aur behno "Rahul Gandhi ko PM banaiye"
Achhe din aa gaye
`,
  mandir: `mitrooon
UP "BJP governed state hai"
SP "opposition me hai"
agar ye sach hai
	bhaiyo aur behno "Mandir wahin banayenge"
nahi toh
	bhaiyo aur behno "Mandir to wahin banega"
achhe din aa gaye`,
  scam: `mitrooon
itne 1 hai
jab tak itne 100 se zyada{
	bhaiyo aur behno "Congress ne " hai
	bhaiyo aur behno itne hai
	bhaiyo aur behno "crore ka scam kiya"
	itne (itne+1) hai
}
achhe din aa gaye
`,
  custom: ""
};

new Vue({
  el: "#app",
  data: {
    code: "",
    choice: "",
    options: [
      { name: "Hello World", value: "hello-world" },
      { name: "Agar / Nahi Toh (If / Else)", value: "if-else" },
      { name: "Mandir.chai", value: "mandir" },
      { name: "Scam.chai", value: "scam" },
      { name: "Custom", value: "custom" }
    ],
    out: ""
  },
  methods: {
    sendReq(e) {
      axios
        .post("https://modiscript.daksh.now.sh/", {
          code: this.code
        })
        .then(res => (this.out = res.data.out))
        .catch(err => (this.out = err.response.data.error));
    }
  },
  watch: {
    choice(v) {
      this.code = codes[v];
    }
  },
  mounted() {
    this.choice = "hello-world";
  }
});
