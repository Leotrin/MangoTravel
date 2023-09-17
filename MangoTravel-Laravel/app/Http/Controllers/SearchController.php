<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Search;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\Facades\Image;
use OpenAI\Laravel\Facades\OpenAI;
use Carbon\Carbon;
use Krisciunas\OpenAi\Api\GenerateImageCommand;
use Krisciunas\OpenAi\Api\ImagePrompt;
use Exception;


class SearchController extends Controller{

    public function  getTripById($id){
        return Search::find($id);
    }
    public function getAllTrips(Request $request){

        return Search::where('device_id',$request->input('device_id'))->get();
    }
    public function  createNewTripSearch(Request $request){
        set_time_limit(0);

        if (\request()->isMethod('post')){
            $validator = Validator::make($request->all(), [
                'device_id' => ['required', 'string', 'max:255'],
                'from_date' => ['required', 'string', 'max:100'],
                'to_date' => ['required', 'string', 'max:100'],
                'people' => ['required'],
            ]);

            if($validator->fails()){
                return response()->json(['errors' => $validator->errors()], 422);
            }

            else {
                try {
                    $text = "Provide me a information about my stay, i will give you the data for my trip, and you  give me a description what can i visit in that place. The place is $request->where ,from date $request->from_date, till date $request->to_date  for $request->people peoples.
                    And give a long description of each place that i should visit in $request->where per each day. DO NOT INCLUDE TIME SLOT,ONLY TEXT!!!.
                ";
                    $fromDate = Carbon::createMidnightDate($request->from_date);
                    $toDate = Carbon::createMidnightDate($request->to_date);
                    $totalDays = $fromDate->diffInDays($toDate);
                    $isFirstTime = true;
                    $chatGTPresponse = [];
                        $totalDays ++;
                    $authorizationToken = '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';
                    $imagesGenerationCommand = new GenerateImageCommand();
                    $imagesData = $imagesGenerationCommand->execute(
                        $authorizationToken,
                        new ImagePrompt(
                            'please create an image of maginificent city of,' . $request->where,//A text description of the desired images. The maximum length is 1000 characters.
                            1, //Number of images to generate. Must be between 1 and 10
                            ImagePrompt::SIZE_1024x1024, // The size of generated images
                            ImagePrompt::FORMAT_URL //The format in which images are returned
                        )

                    );

                    $image = Image::make($imagesData[0]['url']);

                    /**
                     * Main Image Upload on Folder Code
                     */
                    $imageName = uniqid() . ".jpg";
                    $destinationPath = public_path('images/');
                    $image->save($destinationPath . $imageName);


                    /**
                     * Write Code for Image Upload Here,
                     *
                     * $upload = new Images();
                     * $upload->file = $imageName;
                     * $upload->save();
                     */



            $json = file_get_contents('https://maps.googleapis.com/maps/api/geocode/json?address=' . urlencode("$request->where") . '&key=AIzaSyCDhkmmTIw-udufjBDVvfoZU1iTsWO2OE4');
            $json = json_decode($json, true);
            $position = $json['results'][0]['geometry']['location'];

                for ($i = 0; $i <= $totalDays; $i++) {
                        $result = OpenAI::completions()->create([
                            'model' => 'text-davinci-003',

                            'prompt' => $text . '.Give me all details for day' . $i + 1 . '.do not include other text such as iterinary or date from date to.Please provide more text for each day about the stay in' . $request->where .', and please do not include the text' . $request->where . '!!',
                            'max_tokens' => 3800,
                        ]);
                        $chatGTPresponse[$i] = ['text' => $result['choices'][0]['text']];




                }
                $search = new Search();
                $search->device_id = $request->input('device_id');
                $search->where = $request->input('where');
                $search->from_date = $request->input('from_date');
                $search->to_date = $request->input('to_date');
                $search->people = $request->input('people');
                $search->response = $chatGTPresponse;
                $search->image = $imageName;
                $search->position = $position;
                $search->save();
                return response()->json(['data' => $search]);
                }catch(\Exeption $e){
                    dd($e->getMessage() . ' ' . $e->getLine());
                }

}

            }

    }


    }


