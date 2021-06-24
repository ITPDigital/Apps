package com.pagesuite.droid.arabianbusiness.utils;

import android.graphics.drawable.Drawable;
import android.webkit.URLUtil;
import android.widget.ImageView;

import com.bumptech.glide.Glide;
import com.bumptech.glide.RequestBuilder;
import com.bumptech.glide.load.resource.bitmap.RoundedCorners;
import com.bumptech.glide.request.RequestOptions;
import com.pagesuite.droid.arabianbusiness.MainApplication;

public class ImageUtility {

    public static void loadImage(ImageView imageView, String url){

        if(URLUtil.isValidUrl(url)){
            RequestOptions requestOptions = new RequestOptions();
            requestOptions.transform(new RoundedCorners(5));
            RequestBuilder<Drawable> builder = Glide.with(MainApplication.getContext()).load(url);
            builder = builder.apply(requestOptions);
            builder.into(imageView);
        }
    }
}
