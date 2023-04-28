<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use voku\helper\HtmlDomParser;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;


class BrowseUrlController extends Controller
{
    public function browseUrl(Request $request) {
        $url = $request->input('url');

        if (!empty($url)) {
            try {

                $client = new Client();
                $response = $client->request('GET', $url, [
                    'verify'      => false,
                    'http_errors' => false   // Set to false to prevent Guzzle from throwing exceptions for HTTP errors
                ]);

                $statusCode = $response->getStatusCode();
                $results    = 'An error with the browseUrl has happened. Could be a 404.';


                if ($statusCode >= 200 && $statusCode < 300) {
                    $html = $response->getBody()->getContents();
                    $dom  = HtmlDomParser::str_get_html($html);

                    // Remove CSS
                    foreach ($dom->find('style') as $style) {
                        $style->outertext = '';
                    }

                    // Remove scripts
                    foreach ($dom->find('script') as $script) {
                        $script->outertext = '';
                    }

                    // Exclude footer by id and class (#footer, .footer)
                    foreach ($dom->find('#footer, .footer') as $footer) {
                        $footer->outertext = '';
                    }

                    // Exclude footer tags
                    foreach ($dom->find('footer') as $footer) {
                        $footer->outertext = '';
                    }

                    // Exclude header tags
                    foreach ($dom->find('header') as $header) {
                        $header->outertext = '';
                    }

                    // Exclude footer by id and class (#header, .header)
                    foreach ($dom->find('#header, .header') as $header) {
                        $header->outertext = '';
                    }

                    // TODO - Try to remove all element with *footer* and *header* class


                    // Loop through all <a> tags
                    // foreach ($dom->find('a') as $a) {
                    //     // Get the href attribute
                    //     $href = $a->getAttribute('href');

                    //     // Remove all attributes
                    //     foreach ($a->getAllAttributes() as $attr => $val) {
                    //         $a->removeAttribute($attr);
                    //     }

                    //     // Add back only the href attribute
                    //     $a->setAttribute('href', $href);
                    // }


                    // Remove all tags except <a>
                    $allowedTags = '';
                    $bodyContent = strip_tags($dom->find('body', 0)->innerHtml(), $allowedTags);

                    // Remove spacing \s
                    $results = preg_replace('/\s\s+/', ' ', $bodyContent);
                    $results = preg_replace('/\n\n+/', ' ', $bodyContent);
                    $results = mb_substr($results, 0, 3000);
                }

                return response()->json(['content' => $results]);
            } catch (\Exception $e) {
                return response('Error: ' . $e->getMessage(), 500);
            }
        } else {
            return response('Error: Invalid URL parameter', 400);
        }
    }
}
