/**
 * Jalan sebelum halaman digambar. Dua tugas:
 *  1. Pasang tema tersimpan, supaya nggak ada kedip putih.
 *  2. Tandai bahwa JavaScript hidup. Animasi masuk cuma nyembunyiin elemen
 *     kalau tanda ini ada — jadi kalau JS gagal, isinya tetap kelihatan,
 *     bukan halaman kosong.
 */
const script = `
(function(){
  var d = document.documentElement;
  try {
    var t = localStorage.getItem("portos-theme");
    if (t === "dark" || t === "light") d.setAttribute("data-theme", t);
  } catch (e) {}
  d.setAttribute("data-js", "1");
})();
`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
