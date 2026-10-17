/* Auré — Enquiry List ("bag"). Stored in localStorage so it is shared
   across every page. "Send enquiry" opens WhatsApp with a pre-filled
   message listing the selected pieces.
   SHOPIFY: replace with the native cart (/cart/add.js, /cart.js) and checkout. */
(function () {
  var KEY = 'aure_enquiry';
  var WHATSAPP_NUMBER = '923218955558'; // public business WhatsApp number

  function read() {
    try {
      var a = JSON.parse(localStorage.getItem(KEY) || '[]');
      return Array.isArray(a) ? a : [];
    } catch (e) { return []; }
  }
  function write(list) {
    try { localStorage.setItem(KEY, JSON.stringify(list)); } catch (e) {}
    try { window.dispatchEvent(new CustomEvent('aure-cart-change')); } catch (e) {}
  }

  window.AureCart = {
    read: read,
    count: function () {
      return read().reduce(function (n, x) { return n + (x.qty || 1); }, 0);
    },
    add: function (item) {
      var list = read(), i = -1;
      for (var k = 0; k < list.length; k++) { if (list[k].key === item.key) { i = k; break; } }
      if (i >= 0) list[i].qty = (list[i].qty || 1) + (item.qty || 1);
      else list.push(item);
      write(list);
      return list;
    },
    remove: function (key) {
      write(read().filter(function (x) { return x.key !== key; }));
    },
    setQty: function (key, qty) {
      write(read().map(function (x) {
        return x.key === key ? Object.assign({}, x, { qty: Math.max(1, qty) }) : x;
      }));
    },
    clear: function () { write([]); },
    message: function () {
      var list = read();
      if (!list.length) return '';
      var m = 'Hello Auré,\n\nI\u2019d love to enquire about the following pieces:\n\n';
      list.forEach(function (x, i) {
        m += (i + 1) + '. ' + x.name + '\n';
        m += '   \u2022 Item: ' + (x.item || '\u2014') + '\n';
        m += '   \u2022 Size: ' + (x.size || 'Not selected') + '\n';
        m += '   \u2022 Fabric: ' + (x.fabric || '\u2014') + '\n';
        m += '   \u2022 Quantity: ' + (x.qty || 1) + '\n';
        if (x.price) m += '   \u2022 Price: ' + x.price + '\n';
        m += '\n';
      });
      m += 'Could you share availability and next steps? Thank you.';
      return m;
    },
    send: function () {
      var msg = this.message();
      if (!msg) return;
      window.open('https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(msg), '_blank', 'noopener');
    }
  };
})();
