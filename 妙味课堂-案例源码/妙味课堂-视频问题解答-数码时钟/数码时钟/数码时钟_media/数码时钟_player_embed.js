var videosubdirectory = "数码时钟_media/";
var videofile = "数码时钟.avi";
//this will be the final video link (absolute path)
var videolink = location.href;

//remove the file:// because windows media doesn't understand that
var file = videolink.indexOf( "file://");

if ( file > -1 )
{
   // THIS IS A LOCAL PATH
   videolink = videolink.substring( file + 8 );

   //remove the %20 because media player doesn't understand those
   while( videolink.lastIndexOf( "%20" ) != -1 )
   {
      videolink = videolink.replace( "%20", " " );
   }

   //remove the html file name now
   var lastslash = videolink.lastIndexOf( "/");

   if ( lastslash > -1 )
      videolink = videolink.substring( 0, lastslash );

   //add the subfolder (if there is one) and then the video file name
   if ( videosubdirectory.length > 0 )
      videolink = videolink + "/" + videosubdirectory + videofile;
   else
      videolink = videolink + "/" + videofile;
}
else
{
   if ( videosubdirectory.length > 0 )
      videolink = videosubdirectory + videofile;
   else
      videolink = videofile;
}
var oeTags = '<object id="mediaPlayer" classid="CLSID:6BF52A52-394A-11d3-B153-00C04F79FAA6"'
         + 'width="800" height="665"'
         + 'codebase="http://activex.microsoft.com/activex/controls/mplayer/en/nsmp2inf.cab#Version=5,1,52,701"'
         + 'standby="Loading Microsoft Windows Media Player components..."'
         + 'type="application/x-oleobject">'
         + '   <param name="autoStart" value="true"/>'
         + '   <param name="url"       value="数码时钟_media/数码时钟.avi" />'
         + '   <param name="wmode"     value="transparent" />'
         + '   <param name="uiMode"    value="full" />'
         + '   <param name="loop"      value="false" />'               
         + '   <embed id       ="EmbedmediaPlayer"'
         + '       type        ="application/x-mplayer2"'
         + '       src         ="' + videolink + '"'
         + '       width       ="800"'
         + '       height      ="665">'
         + '   </embed>'
         + '</object>';
document.write(oeTags);

