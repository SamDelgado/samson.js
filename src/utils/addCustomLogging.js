/* Add logging module to object */
import { emptyFunction } from './functions.js';

function formatConsoleDate(date) {

  var hour = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();
  var milliseconds = date.getMilliseconds();

  var ts_hours = ((hour < 10) ? '0' + hour: hour);
  var ts_minutes = ((minutes < 10) ? '0' + minutes: minutes);
  var ts_seconds = ((seconds < 10) ? '0' + seconds: seconds);
  var ts_milliseconds = ('00' + milliseconds).slice(-3);

  return ts_hours + ':' + ts_minutes + ':' + ts_seconds + '.' + ts_milliseconds;
  
}

export default function addCustomLogging(console_prefix_name, debug_mode) {
  
  if (debug_mode) {

    var console_formatter = function() {};
    const console_prefix = console_prefix_name ? '[' + console_prefix_name + ']-[' : '[';
    const console_suffix = ']';
  
    console_formatter.toString = function() {
      return console_prefix + formatConsoleDate(new Date()) + console_suffix;
    };
  
    return console.log.bind(console, '%s', console_formatter);

  } else {

    return emptyFunction;

  }

}
