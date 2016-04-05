module CentralServer

open System;
open System.Windows
open System.Windows.Data
open System.Net
open System.Text
open System.IO

let private InitKey = "154669603";
let private Do (postData : string) log =
    let request = WebRequest.Create("http://m.agar.io/") :?> HttpWebRequest
    request.Method <- "POST";
    request.Headers.Add("Origin", "http://agar.io")
    request.Referer <- "http://agar.io"
    let byteArray = Encoding.UTF8.GetBytes(postData)
    request.ContentType <- "application/x-www-form-urlencoded"
    request.ContentLength <- byteArray.LongLength
    using (request.GetRequestStream()) (fun dataStream ->
        dataStream.Write(byteArray, 0, byteArray.Length))
    async {
        let! r = request.GetResponseAsync() |> Async.AwaitTask
        return using (r) (fun response ->
            let webResponse = response :?> HttpWebResponse
            log webResponse.StatusDescription
            match webResponse.StatusCode with
            | HttpStatusCode.OK ->
                using (response.GetResponseStream()) (fun dataStream ->
                    match dataStream with
                    | null -> None
                    | _ -> using (new StreamReader(dataStream))(fun reader ->
                        Some(reader.ReadLine(), reader.ReadLine())))
            | _ -> None)
    }

let GetFfaServer = Do("EU-London" + "\n" + InitKey)
let GetExperimentalServer = Do("EU-London" + ":experimental\n" + InitKey)
let GetTeamsServer = Do("EU-London" + ":teams\n" + InitKey)
