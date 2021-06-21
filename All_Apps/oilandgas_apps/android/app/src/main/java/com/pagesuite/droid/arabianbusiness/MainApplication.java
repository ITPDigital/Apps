package com.pagesuite.droid.arabianbusiness;

import android.app.Application;
import android.content.Context;

import com.inprogress.reactnativeyoutube.BuildConfig;
import com.pritesh.calldetection.CallDetectionManager;
import co.apptailor.googlesignin.RNGoogleSigninPackage;
import com.facebook.react.ReactApplication;
import com.geektime.rnonesignalandroid.ReactNativeOneSignalPackage;
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.analytics.RNFirebaseAnalyticsPackage;
import io.invertase.firebase.links.RNFirebaseLinksPackage;
import io.fullstack.oauth.OAuthManagerPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.imagepicker.ImagePickerPackage;
import com.github.yamill.orientation.OrientationPackage;
import com.inprogress.reactnativeyoutube.ReactNativeYouTube;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.swmansion.reanimated.ReanimatedPackage;
import com.th3rdwave.safeareacontext.SafeAreaContextPackage;
import com.zmxv.RNSound.RNSoundPackage;
import com.reactnativecommunity.webview.RNCWebViewPackage;
import com.brentvatne.react.ReactVideoPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.oblador.vectoricons.VectorIconsPackage;
import com.horcrux.svg.SvgPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import cl.json.RNSharePackage;
import cl.json.ShareApplication;
import com.facebook.CallbackManager;
import com.facebook.reactnative.androidsdk.FBSDKPackage;

import io.invertase.firebase.fabric.crashlytics.RNFirebaseCrashlyticsPackage; // <-- Add this line
import com.dooboolab.RNIap.RNIapPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ShareApplication,ReactApplication {

  private static CallbackManager mCallbackManager = CallbackManager.Factory.create();
  private static Context context;

  protected static CallbackManager getCallbackManager() {
    return mCallbackManager;
  }
  public static Context getContext() {
    return context;
  }


  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }


    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
              new RNDeviceInfo(),
              new MainReactPackage(),
              new SafeAreaContextPackage(),
              new AsyncStoragePackage(),
              new ReanimatedPackage(),
              new ReactNativeOneSignalPackage(),
              new RNFirebasePackage(),
              new RNFirebaseAnalyticsPackage(),
              new RNFirebaseLinksPackage(),
              new OAuthManagerPackage(),
              new RNGoogleSigninPackage(),
              //new CallDetectionManager(MainApplication.this),
              new FBSDKPackage(),
              new RNFetchBlobPackage(),
              new ImagePickerPackage(),
              new OrientationPackage(),
              new RNSoundPackage(),
              new ReactNativeYouTube(),
              new RNCWebViewPackage(),
              new ReactVideoPackage(),
              new VectorIconsPackage(),
              new SvgPackage(),
              new RNGestureHandlerPackage(),
              new SplashScreenReactPackage(),
              new RNSharePackage(),
              new RNFirebaseCrashlyticsPackage(),
              new RNIapPackage(),
              new BlueConicPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    context = this;
    // try {
    //     ProviderInstaller.installIfNeeded(getApplicationContext());
      
    //     /**
    //     * https://developer.android.com/training/articles/security-gms-provider.html
    //     * this can take anywhere from 30-50 milliseconds (on more recent devices) to 350 ms (on older devices)
    //     * keywords: installIfNeeded(), installIfNeededAsync()
    //     *
    //     * Once the Provider is updated, all calls to security APIs (including SSL APIs) are routed through it. 
    //     * (However, this does not apply to android.net.SSLCertificateSocketFactory, 
    //     * which remains vulnerable to such exploits as CVE-2014-0224.)
    //     *
    //     */
      
    // } catch (GooglePlayServicesRepairableException e) {
    //     e.printStackTrace();
    // } catch (GooglePlayServicesNotAvailableException e) {
    //     e.printStackTrace();
    // }
  }
   @Override
     public String getFileProviderAuthority() {
            // return BuildConfig.APPLICATION_ID + ".provider";
            return "com.pagesuite.droid.arabianbusiness.provider";
     }

}