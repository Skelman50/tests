import * as gm from 'gm';

gm('./image.jpg')
.resize('!')
.write('./out.png', function (err) {
  if (err) console.log(err);
});
