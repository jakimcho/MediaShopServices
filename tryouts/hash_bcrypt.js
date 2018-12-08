const bcrypt = require( 'bcrypt' );


async function gogo()
{
  const salt1 = await bcrypt.genSalt( 10 );
  const hash1 = await bcrypt.hash( '1234', salt1 );
  const hash2 = await bcrypt.hash( '1234', salt1 );

  const salt2 = await bcrypt.genSalt( 10 );
  const hash3 = await bcrypt.hash( '1234', salt2 );
  const hash4 = await bcrypt.hash( '1234', salt2 );

  console.log( `Salt1 is ${ salt1 }`);
  console.log( `hash1 is ${ hash1 }`);
  console.log( `hash2 is ${ hash2 }`);

  console.log( `Salt2 is ${ salt2 }`);
  console.log( `hash3 is ${ hash3 }`);
  console.log( `hash4 is ${ hash4 }`);


  const res = await bcrypt.compare( "1234", hash3 );
  console.log(`Password is ok ${ res }`);
}

gogo();