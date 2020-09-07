write-host "`n--------------------------------------------"
write-host " ##  MongoDB database restore assistant  ## "
write-host "--------------------------------------------"
write-host "ATTENTION! If you encounter problems, try performing all the necessary steps manually."


### CONFIGURATION

# MongoDB
$mongoDbPath = "C:\Program Files\MongoDB\Server\4.2\bin"
$checker = $FALSE


### CHECK ADMINISTRATOR RIGHTS

if (-NOT ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")) {
   write-Warning "This setup needs admin permissions. Please run this file as admin."     
   break
}


### MONGODB CHECK

if (Test-Path -path $mongoDbPath) { 
	write-host "`nMongoDB detected successfully!"
	$checker = $TRUE
} else {
	write-host "`nMongoDB not detected on the path $mongoDbPath"
}


### MONGODB DATABASE RESTORE

if ($checker) {

    $mongodb_dump = "$PSScriptRoot\..\db_dump\"
    
    $download_mongodb = $TRUE

    if (Test-Path $mongoDbPath\mongorestore.exe) {
    	write-host "MongoDB restore database..."
    	$start_time = Get-Date
    	Start-Process $mongoDbPath\mongorestore.exe $mongodb_dump -Wait
    	write-Output "Time taken: $((Get-Date).Subtract($start_time).Seconds) second(s)"
    }

} else {
    write-host "Canceled MongoDB restore database."
}


write-host "`nDone!"