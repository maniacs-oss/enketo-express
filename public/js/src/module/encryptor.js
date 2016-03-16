'use strict';

var utils = require( './utils' );
var $ = require( 'jquery' );

//forge( {
//    disableNativeCode: true
//} );

//checkFeasibility();

$( '<input type="file"/>' ).appendTo( $( 'body' ) ).on( 'change', function() {
    console.debug( 'changed', this.files[ 0 ] );
    utils.blobToArrayBuffer( this.files[ 0 ] )
        .then( checkFeasibility )
        .catch( function( e ) {
            console.error( e, e.stack );
        } );
} );


function checkFeasibility( encryptedContent ) {
    var PRIVATE_ASYMMETRIC_KEY = "-----BEGIN RSA PRIVATE KEY-----\nMIIEowIBAAKCAQEA5s9p+VdyX1ikG8nnoXLCC9hKfivAp/e1sHr3O15UQ+a8CjR/\nQV29+cO8zjS/KKgXZiOWvX+gDs2+5k9Kn4eQm5KhoZVw5Xla2PZtJESAd7dM9O5Q\nrqVJ5Ukrq+kG/uV0nf6X8dxyIluNeCK1jE55J5trQMWT2SjDcj+OVoTdNGJ1H6FL\n+Horz2UqkIObW5/elItYF8zUZcO1meCtGwaPHxAxlvODe8JdKs3eMiIo9eTT4WbH\n1X+7nJ21E/FBd8EmnK/91UGOx2AayNxM0RN7pAcj47a434LzeM+XCnBztd+mtt1P\nSflF2CFE116ikEgLcXCj4aklfoON9TwDIQSp0wIDAQABAoIBAE8Gv0sfFMruh6n4\nFHXj2+rAUKkog9s+5heZ0qKiJonlK4b2+IdB+HTW/wM/biAWhYR0NP2HAB9xdKZY\nib1bZjjOGMdBapk3VtKodTAQwEe9G/1Ux400jLuTtP80Vy/ZEneyHwYxq2Z2IFb8\n01pJ2BOmlC9mNrwIx/qLJkobTb3MPZ1fO4p8uLUrx12F7A4aXmtmcLJY9QsEPGh+\n4P1pNcypFhc3hRYBFdH9GSu3zheL8eBUScaK3+l4mi06k167XPAwHNk+0+yzqUGv\n9ujGvLdWPPJyL2Xhvg9kKWl2FfdP35g44S8gZ6gKhJVB5RnEmLAMBT1Jz0fk9ftv\neLEKmHkCgYEA/hD6P79OEBeynJUzgL6Jx5OYfdFzGMpa8AUJOj0CW8hwrxxb1qGm\nb4y6+RfndzySP8Pflz6MtzTIxyR0T6gRHPBy3QgSvT6ose4mj3hRPqHPePWpYw5g\nXC9ECaTStpjRoId/6Pn2uj+f9Kx/uScjJaXhRvCjVdFMlZOxYTRDS30CgYEA6JEf\nz1aXpP/xepsz4jVsA6g8cvisLdqq2KAn3+Kz/rM3q6NWYTTObkuiqmgg0kqxIQ4u\ndoy+E1vEUocrbxY4Jb5MVeS+3OcJdiQ5oP/AhXnWmWMMAI8TvMwvB6sZ1nhzp2xW\nxyk2r4FX7Tjoz3ieJ9U0JayXu8iAaNUG1nHVq48CgYEAuozKwy376rML0g93rqu5\nTRKh4Jh/M4+5sA1ylhGf/raxjtJ62KD/LV8fFrGnopSWKj3vmgUym38lgZvRz39v\neVlQbd10rQIqKePc6nGE7kEvrvhqtLIkrOuDwLUGh060dXOoxu9ra5w2Hhje+5uy\nIf2n6UfeFrBE1HuKvf36/50CgYALPCeLPqWoxOyHfcPt46LKMnBpJXY76NpkCKik\nejEz1riTxBpCK+jlDyZWkR00y4LvE95Ov9HW4ZIEYp9IiIxB1oWdiKVnyol8eZeH\nHZPRXudtFYnY5RCRCFQlTLC82ajMp8Excd5AcEEtJpionS0Ww4f3YfUajz8U0WW5\nKlqmJQKBgF9M24KnPN4YbxzTAUMUv25HYetoqUIyr+jPg7pLs79FPRGqQWsok7yq\nwCw6kK8sHwvpPoWEvB8vqLwCcyai6AXmEbebJJTscVNePQzLn2PgNZG+F2DC0e01\nME3SrDXlECL7xqqQVXwmEm4TUTpSQJdtSEIuQ+PBG4r59gXWiEK/\n-----END RSA PRIVATE KEY-----";
    var PUBLIC_ASYMMETRIC_KEY = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5s9p+VdyX1ikG8nnoXLCC9hKfivAp/e1sHr3O15UQ+a8CjR/QV29+cO8zjS/KKgXZiOWvX+gDs2+5k9Kn4eQm5KhoZVw5Xla2PZtJESAd7dM9O5QrqVJ5Ukrq+kG/uV0nf6X8dxyIluNeCK1jE55J5trQMWT2SjDcj+OVoTdNGJ1H6FL+Horz2UqkIObW5/elItYF8zUZcO1meCtGwaPHxAxlvODe8JdKs3eMiIo9eTT4WbH1X+7nJ21E/FBd8EmnK/91UGOx2AayNxM0RN7pAcj47a434LzeM+XCnBztd+mtt1PSflF2CFE116ikEgLcXCj4aklfoON9TwDIQSp0wIDAQAB";
    var BASE64_ENCRYPTED_SYMMETRIC_KEY = "zjb9MWfYxjXnrASv08mlVWsrw/54bVyO5LTsQosnKDZ/jsF7EwGG2iLtCcRALnTUpVjcpQCIv+WZIYukNThYCwWcjrdeiRufjQqBo7H1lKxLMTPu2zrmBRXyj2xmnprggR3Yg/q6jhTNoK5xtm1wYOTgWM5X+/SjR34eXfMTrns6ZDchuZSOzmijtyFh+pSf7d7E5iyO56DjhNjPBI5p5DNDhRrctY1eBRwwxwsaQb5jJzT6VYqKYu1P+4kSOaxsY04jO/g+auBFytaLKOfaCMZ8TAYERl1tDaP43Fm/JCHvV1d8BGtUwUAHvyIAtieUIPmeLmnGExsq6VnUy40uCQ==";
    var SIGNATURE = "cWUxhGaLiWEaGLhpeRN2mQrwi7RHmdp/26duNfzgsPhDkeTnnF6LzXeKBDE2DtoViEYj2jopJrBRvi4FeVyr8x5hfFQYeACq92R5jOqnE2qEzI0JuKIfjuYI12b9bQJllNcYekI30m/Df3hipawAnnK27GwI/iGRSXGRp7T1e0TA7U/H4t45IPwkWKWyFfohfFPkY0Ro4Cvb2HfRvzRxhVklIoFPAEYYdHrGracEEv+8gxlkE4vapNI7lKhRQkU6j6IQW8rlmYWp7hHaZO6gfIiHH7Hooc+n+BhYF2TY+JfrehVmJ1Qg2chp5FjNJ+A86nl8W2n0xsI1Hj67AnfYKQ==";
    var INSTANCEID = "uuid:aab60510-f435-45ca-a7ae-dec99914a8c8";
    var symmetricKey = decryptSymmetricKey( BASE64_ENCRYPTED_SYMMETRIC_KEY, PRIVATE_ASYMMETRIC_KEY );

    decryptContent( encryptedContent, symmetricKey, SIGNATURE, INSTANCEID );
}


function decryptSymmetricKey( base64EncryptedKey, privateKeyPem ) {
    var ASYMMETRIC_ALGORITHM = 'RSA-OAEP';
    var encryptedKey = atob( base64EncryptedKey );
    console.debug( 'encrypted symmetric key', encryptedKey );

    var pki = forge.pki;
    var privateKey = pki.privateKeyFromPem( privateKeyPem );

    // need equivalent to Java's "RSA/NONE/OAEPWithSHA256AndMGF1Padding"
    var decrypted = privateKey.decrypt( encryptedKey, ASYMMETRIC_ALGORITHM, {
        md: forge.md.sha256.create() //,
            //mgf1: {
            //    md: forge.md.sha1.create()
            //}
    } );

    console.debug( 'decrypted symmetric key', decrypted );
    return decrypted;
}


function decryptContent( encryptedContent, key, base64Signature, instanceId ) {
    // need equivalent to Java's: AES/CFB/PKCS5Padding
    var SYMMETRIC_ALGORITHM = 'AES-CFB';
    var IV_BYTE_LENGTH = 16;
    // iv is the md5 hash of the instanceID and the symmetric key
    /* var md = forge.md5.create();
    console.log('md', md);
    // convert to ByteString first?
    // TODO: double-check the iv-generation!
    console.debug('bytebuffer of instanceId',new forge.util.ByteBuffer(instanceId).getBytes() );
    console.debug('key', key, 'in base64:', btoa(key));
    md.update(instanceId);
    md.update(key);
    var messageDigest = md.digest().getBytes();
    //console.debug('stirng to bytes', stringToBytes(messageDigest));
    var ivSeedArray= [];
    console.debug('digest',messageDigest, messageDigest.length);
    for (var i = 0 ; i < IV_BYTE_LENGTH ; i++) {
      var byteToReplace = messageDigest[ (i % messageDigest.length )]; 
      var charCode = byteToReplace.charCodeAt(0);
      var newCharCode = charCode;
      if (charCode >= 128) {
        // WHY? No idea...
        newCharCode = charCode - 256;
      }
      ivSeedArray[i] = String.fromCharCode(newCharCode);
      console.debug('charcode', ivSeedArray[i].charCodeAt(0));
    }
*/
    /*var array = [110,-35,87,120,-90,-42,-121,80,87,-19,-94,-1,-61,69,-72,31];
    ++array[2];
    console.log('array of codes after replacing', array);
    ivSeedArray.map(function(code){
        return String.fromCharCode(code);
    })*/

    // ++ messageDigest for each file? the submission.xml is the last!
    //incrementByteAt(ivSeedArray, 0);

    // var iv = ivSeedArray.join('');

    var ivs = [];

    [
        //'bt1XeKbWh1BX7aL/w0W4Hw==', // no incrementing
        //        'b91XeKbWh1BX7aL/w0W4Hw==', // index 0
        //        'bt5XeKbWh1BX7aL/w0W4Hw==', // index 1
        //        'bt1YeKbWh1BX7aL/w0W4Hw==', // index 2
        //        'bt1XeabWh1BX7aL/w0W4Hw==', // index 3
        //        'bt1XeKfWh1BX7aL/w0W4Hw==', // index 4
        //'bt1XeKbXh1BX7aL/w0W4Hw==', // index 5
        //'b95YeKbWh1BX7aL/w0W4Hw==', // index 0,1,2
        'b95YeabWh1BX7aL/w0W4Hw==', // index 0,1,2,3
    ].forEach( function( base64 ) {
        ivs.push( atob( base64 ) );
        //ivs.push( decode( base64 ) );
        //ivs.push( forge.util.binary.base64.decode( base64 ) );
    } );
    var signature = atob( base64Signature );

    console.debug( 'ivs', ivs );

    encryptedContent = new forge.util.ByteBuffer( encryptedContent ).getBytes();

    ivs.forEach( function( ivbase ) {
        //console.debug( 'iv', iv );
        var encryptedContentBuffer = new forge.util.ByteBuffer( encryptedContent );
        console.debug( 'length of content', encryptedContentBuffer.length() );
        var iv = new forge.util.ByteBuffer( ivbase ).getBytes( 16 );
        //var firstBlock = encryptedContentBuffer.getBytes( 16 ); // this actually *removes* the first 16 bytes!
        console.debug( 'length of content', encryptedContentBuffer.length() );
        console.debug( 'iv:', iv );
        var decipher = forge.cipher.createDecipher( SYMMETRIC_ALGORITHM, key );

        decipher.start( {
            iv: iv,
            blockSize: 16
        } );

        decipher.update( encryptedContentBuffer );

        var pass = decipher.finish();
        var outputString = decipher.output.getBytes();
        if ( outputString.substring( 0, 1 ) === '<' ) {
            console.log( 'WHOHHOHOHOHOHHOOOOOOOOO' );
            //window.alert( 'yay!, iv "' + iv + ' works!' );
        }
        console.debug( 'pass', pass );
        console.debug( 'output', outputString );
    } );
}

function incrementByteAt( arr, index ) {
    var charCode = arr[ index ].charCodeAt( 0 );
    var replacement = String.fromCharCode( charCode + 1 );
    arr[ index ] = replacement;
    console.debug( 'replaced', arr );
    return arr;
}
