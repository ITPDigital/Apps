
package com.itpmedia.ab;

import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import com.blueconic.BlueConicClient;
import com.blueconic.BlueConicClientFactory;
import com.itpmedia.ab.constants.IntentExtras;
import com.itpmedia.ab.model.response.video.VideoRelationUnd;
//import com.itpmedia.ab.ui.YoutubePlayerActivity;

import android.app.Activity;
import java.util.HashMap;
import java.util.Map;
import android.util.Log;
import android.content.Intent;

public class BlueConicModule extends ReactContextBaseJavaModule {
    private BlueConicClient myBlueConicClient;

    public BlueConicModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "BlueConic";
    }


@ReactMethod
public void setBlueconic(final String nid,final String site,final String uid,final String token, final String deeplinkUrl ) {
    //    // Method content
    Log.d("newactivity","setblueconic called");

    final Activity activity = getCurrentActivity();


    // myBlueConicClient = BlueConicClientFactory.getInstance(activity);
    
	
    // Set screen name to identify the activity.
    // final Map<String, String> properties = new HashMap<>();
    // properties.put("screenName", "Main/Section1");
    // myBlueConicClient.createEvent("PAGEVIEW", properties);

    //  properties.put("Name", name);
    // myBlueConicClient.createEvent("PAGEVIEW", properties);

    // Log.d("blueconic1",name);
     //Intent intent = new Intent(activity, YoutubePlayerActivity.class);
     //String stringNid = nid.toString();
    //String result = stringNid.substring(0, stringNid.indexOf("."));
    //String stringUid = uid.toString();
    //String doubleUid = stringNid.substring(0, stringNid.indexOf("."));
//     intent.putExtra(IntentExtras.EXTRA_NID, nid);
//       intent.putExtra(IntentExtras.EXTRA_SITE, site);
//       intent.putExtra(IntentExtras.USER_ID,uid);
//       intent.putExtra(IntentExtras.BEARER_TOKEN,"Bearer "+token);
//        intent.putExtra(IntentExtras.DEEPLINK_URL,deeplinkUrl);
//
//      activity.startActivity(intent);
     Log.d("newactivity",uid+token);
}

@ReactMethod
public void setBlueconicProfile(final String name,final String emailId,final String deviceId) {
    // Method content
    final Activity activity = getCurrentActivity();
    myBlueConicClient = BlueConicClientFactory.getInstance(activity);
	
    // Set screen name to identify the activity.
    final Map<String, String> properties = new HashMap<>();
    // properties.put("screenName", "Main/Section1");
    // myBlueConicClient.createEvent("PAGEVIEW", properties);

    //  properties.put("Name", name);
    //  properties.put("Email id", emailId);
    //  properties.put("Device id", deviceId);
    myBlueConicClient.addProfileValue("Name", name);
    myBlueConicClient.addProfileValue("Email id", emailId);
    myBlueConicClient.addProfileValue("Device id", deviceId);
    Log.d("blueconic",emailId);
}

public static void launchBrandDetailsPage(VideoRelationUnd videoInfo){

}
}