function aton(ip) {
  return ip.split('.')
    .reduce((value, octet) => (value << 8) + parseInt(octet))
    >>> 0
}


function ntoa(value) {
  return [
    value >>> 24,
    value >> 16 & 255,
    value >> 8 & 255,
    value & 255
  ].join('.')
}


function* ip_range(start, stop) {
  let i = aton(start)

  while (i <= aton(stop)) {
    yield ntoa(i ++)
  }
}


function check_port(host, port, time, cb) {

  let controller = new AbortController()
  let signal = controller.signal


  fetch(`http://${host}:${port}`, {
    mode: 'no-cors',
    signal
  })
  .then(() => cb(host, port))
  .catch(error => error.message.match('to fetch') && cb(host, port))


  setTimeout(() => controller.abort(), time)
}



async function port_scan(start, stop, ports) {

  for (let host of ip_range(start, stop)) {
    for (let port of ports) {
      check_port(host, port, 400, console.log)
    }
  }
}
