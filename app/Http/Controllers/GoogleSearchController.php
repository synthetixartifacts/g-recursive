<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use DOMDocument;
use DOMXPath;
use DOMText;
use DOMElement;
use DOMNode;
use voku\helper\HtmlDomParser;

class GoogleSearchController extends Controller
{

    public function googleSearchResult(Request $request) {

        $query     = $request->input('query');
        $maxResult = 5;

        if (!empty($query)) {
            try {
                $response = Http::withoutVerifying()->get(
                    'https://www.google.com/search?q='.$query
                );

                $results = [];

                if ($response->successful()) {


                    $html = $response->body();
                    $dom  = HtmlDomParser::str_get_html($html);

                    $count   = 0;

                    // Find the div with ID "main"
                    $main = $dom->find('#main', 0);

                    // Find 5 first result
                    foreach ($main->children() as $child) {
                        if ($count > $maxResult) {
                            break;
                        }

                        if ($child->find('h3', 0) && $child->find('h3', 0)->plaintext != '') {
                            $title = $child->find('h3', 0)->plaintext;
                            $link  = str_replace('/url?q=', '', $child->find('a', 0)->getAttribute('href'));
                            $link  = explode('&', $link)[0];

                            // Get description
                            $mainDiv = $child->find('a', 0)->parent()->parent();
                            $divDesc = null;
                            $divCounter = 0;

                            foreach ($mainDiv->children() as $child) {
                                if ($child->tag == 'div') {
                                    $divCounter++;
                                    if ($divCounter == 2) {
                                        $divDesc = $child;
                                        break;
                                    }
                                }
                            }

                            $description = ($divDesc !== null) ? $divDesc->plaintext : '';

                            // if ($lastSpan !== false) {
                            //     $description = $lastSpan->innertext;
                            // }

                            if ($title && $link && str_contains($link, 'http')) {
                                $count++;
                                $results[] = [
                                    'title'       => $title,
                                    'link'        => $link,
                                    'description' => $description,
                                ];
                            }
                        }
                    }
                }

                return response()->json($results);
            } catch (\Exception $e) {
                return response('Error: ' . $e->getMessage(), 500);
            }
        } else {
            return response('Error: Invalid URL parameter', 400);
        }
    }

}
