export function dealResponseCode(
  response,
  successHandler,
  failHandler,
  nextStepHandler
) {
  const code = response.code;
  switch (code) {
    // GeneralGetSuccess
    case 200000:
    case 200104:
      successHandler();
      break;
    case 400000:
    case 400001:
    case 400002:
    case 400003:
    case 400004:
    case 400005:
    case 400006:
    case 400007:
    case 400104:
    case 400200:
    case 400201:
    case 400202:
    case 400203:
    case 400204:
    case 400205:
    case 400206:
    case 400207:
    case 400208:
    case 400209:
      failHandler();
      break;
  }
}
